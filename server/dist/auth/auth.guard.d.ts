import { CanActivate, ExecutionContext } from '@nestjs/common';
export default class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
