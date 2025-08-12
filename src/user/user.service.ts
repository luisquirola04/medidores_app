import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { Estado } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {

  } //necesario en cada servicio

  async createUser(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT));

    const emailExists = await this.prisma.usuario.findUnique({
      where: { email: user.email },
    });
    if (emailExists) {
      throw new BadRequestException('El email ya está registrado');
    }

    const dniExists = await this.prisma.usuario.findUnique({
      where: { dni: user.dni },
    });
    if (dniExists) {
      throw new BadRequestException('El DNI ya está registrado');
    }

    try {
      const new_user = await this.prisma.usuario.create({
        data: {
          name: user.names,
          last_names: user.lastNames,
          dni: user.dni,
          address: user.address,
          email: user.email,
          password: hashedPassword,
          rol: user.rol,
          state: true,
        },
      });

      const user_new = plainToInstance(UserDto, new_user, {
        excludeExtraneousValues: true,
      });

      return {
        message: 'Creado correctamente',
        user: user_new,
      };
    } catch (error) {
      throw new Error('Error al crear el usuario. Por favor, intente de nuevo más tarde.');
    }
  }



  async updateUser(user: UpdateUserDto) {
    const data: any = {};

    if (user.address !== undefined) {
      data.address = user.address;
    }
    if (user.email !== undefined) {
      data.email = user.email;
    }
    if (user.password !== undefined) {
      data.password = await bcrypt.hash(user.password, Number(process.env.SALT));
    }
    if (user.state !== undefined) {
      data.state = user.state;
    }

    try {

      const updatedUser = await this.prisma.usuario.update({
        where: { uuid: user.uuid },
        data,
      });


      if (user.state !== undefined || user.state != 1) {
        const user_updated = await this.prisma.usuario.findFirst({ where: { uuid: user.uuid }, select: { id: true } })
        const medidores = await this.prisma.medidor.findMany({ where: { usuarioId: user_updated?.id } })
        const ids_a_actualizar = medidores.map(m => m.id);
        if (ids_a_actualizar.length > 0) {
          await this.prisma.medidor.updateMany({
            where: {
              id: {
                in: ids_a_actualizar
              }
            },
            data: {
              estado: Estado.INACTIVO
            }
          });
        }
      }
      return {
        code: 200,
        message: 'Datos actualizados correctamente',
      };
    } catch (error) {
      return {
        code: 400,
        message: 'Error al actualizar usuario',
        error: error.message,
      };
    }
  }


  async getById(idUser: number) {
    const user = await this.prisma.usuario.findFirst({ where: { id: idUser } });
    return user;
  }


}
