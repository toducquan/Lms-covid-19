import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/config/role';
import { ROLES_KEY } from '../decorator/auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<any>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    if (req.user.role === Role.ADMIN || !requiredRoles) return true;
    return this.checkRole(req.user.role, requiredRoles);
  }

  checkRole(role, requiredRoles): boolean {
    return role === requiredRoles;
  }
}
