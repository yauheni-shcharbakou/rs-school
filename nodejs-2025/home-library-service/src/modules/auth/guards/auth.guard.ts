import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_NEED_AUTH } from '../../../constants/metadata.constants';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNeedAuth: boolean = this.reflector.getAllAndOverride(IS_NEED_AUTH, [
      context.getClass(),
      context.getHandler,
    ]);

    if (!isNeedAuth) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const authHeader =
      request.header('Authorization') ?? request.header('authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [, jwtToken] = authHeader.split(' ');

    if (!jwtToken) {
      throw new UnauthorizedException('Jwt token is missing');
    }

    const payload = this.authService.parsePayload(jwtToken);

    if (!payload) {
      throw new UnauthorizedException('Access token invalid');
    }

    const isUserExists = await this.authService.isUserExists(payload.userId);

    if (!isUserExists) {
      throw new UnauthorizedException('User not found');
    }

    return true;
  }
}
