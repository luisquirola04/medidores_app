import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { useToken } from 'src/utils/use.token';
import { UseToken } from '../interfaces/auth.interface';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/keyDecorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService, private readonly reflector: Reflector) { }
  async canActivate(
    context: ExecutionContext,) {
    const isPublic = this.reflector.get<Boolean>(
      PUBLIC_KEY, context.getHandler(),
    )
    
    if(isPublic){
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['access-token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException("invalid token")
    }
    const manageToken: UseToken | string = useToken(token);

    if (typeof manageToken === "string") {
      throw new UnauthorizedException(manageToken);
    }
    if (manageToken.isExpired) {
      throw new UnauthorizedException("token expired");
    }
    const { sub } = manageToken;
    const user = await this.prisma.usuario.findFirst({ where: { uuid: sub } });
    if (!user) {
      throw new UnauthorizedException("Invalid User");
    }
    req.uuidUser = user.uuid;
    req.roleUser = user.rol;
    return true;
  }
}
