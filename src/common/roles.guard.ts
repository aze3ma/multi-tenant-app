import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RequestWithUser } from './interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!required) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    return required.includes(user?.role);
  }
}
