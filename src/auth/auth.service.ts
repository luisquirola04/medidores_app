import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { PayloadToken } from './interfaces/auth.interface';
import { StringValue } from 'ms';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    public async validate(user: LoginDto) {

        const search = await this.prisma.usuario.findFirst({ where: { email: user.email } })
        if (search) {
            const isMatch = await bcrypt.compare(user.password, search.password);
            if (isMatch) {
                return plainToInstance(UserDto, search, {
                    excludeExtraneousValues: true,
                })
            } else {
                return undefined
            }
        } else {
            return undefined
        }
    }

    public signJWT({ payload, secret, expires }: { payload: jwt.JwtPayload; secret: string; expires: number | StringValue }) {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    public async generateJWT({ user }: { user: Usuario }): Promise<any> {
        const getUser = await this.prisma.usuario.findFirst({ where: { id: user.id } });

        if (getUser) {
            const payload: PayloadToken = {
                role: getUser.rol,
                sub: getUser.uuid,
                names: getUser.name
            }
            
            return {
                accessToken: this.signJWT({ payload, secret: String(process.env.JW_SECRET), expires: '1h' })
            };
        } else {
            return "No se encontro user, generate jwt"
        }


    }

    public async loginUser(data:LoginDto){
        const validateUser = await this.validate(data);
        if(!validateUser){
            throw new UnauthorizedException('Datos no validos');
        }
        const jwt = await this.generateJWT({user: validateUser});
        return {jwt,user:validateUser.name};
    }
}
