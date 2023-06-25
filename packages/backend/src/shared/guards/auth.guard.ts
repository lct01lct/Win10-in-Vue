import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  public static ROLES_KEY = Symbol('roles');

  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride(AuthGuard.ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    console.log(requiredRoles);
    return true;
  }
}

@Injectable()
export class isLoginGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    return true;
  }
}
