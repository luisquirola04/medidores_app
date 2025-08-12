import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from '@prisma/client';
import { Request } from 'express';
import { ADMIN_KEY, PUBLIC_KEY, USER_KEY } from 'src/constants/keyDecorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Verificar si la ruta es pública
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    // 2. Obtener los roles requeridos para la ruta
    const requiredRoleAdmin = this.reflector.get<Rol>(
      ADMIN_KEY,
      context.getHandler(),
    );
    const requiredRoleUser = this.reflector.get<Rol>(
      USER_KEY,
      context.getHandler(),
    );

    // 3. Obtener el rol del usuario de la solicitud 
    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser } = req;

    if (requiredRoleAdmin && roleUser === requiredRoleAdmin) {
      return true; 
    }

    if (requiredRoleUser && roleUser === requiredRoleUser) {
      return true; // Acceso concedido si se necesita 'usuario' y el usuario lo tiene.
    }

    // 5. Si no hay roles específicos, o el usuario no cumple los requisitos,
    // lanzar una excepción de no autorizado.
    if (!requiredRoleAdmin && !requiredRoleUser) {
      // Si la ruta no tiene decoradores de roles, se asume que solo requiere estar autenticado.
      // Aquí podrías agregar una lógica adicional si lo necesitas.
      return true;
    }
    
    // Si la ruta requiere un rol específico pero el usuario no lo tiene, lanzar un error.
    throw new UnauthorizedException('No tienes Acceso a esto');
  }
}