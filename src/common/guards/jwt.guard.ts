import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {

  // ? وارد کردن سرویس jwt
  constructor(private readonly jwtService: JwtService) { }

  // ? بررسی با گارد
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    try {

      const authHeader = request.headers['authorization'];
      if (!authHeader) throw new UnauthorizedException('No token provided');

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token format');

      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = { _id: payload?._id, role: payload?.role, };

      return true;

    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

  }
}
