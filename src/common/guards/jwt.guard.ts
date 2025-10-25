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
    const response = context.switchToHttp().getRequest<Response>();

    try {

      const authHeader = request.headers['authorization'];

      if (!authHeader) throw new UnauthorizedException('No token provided');

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token format');

      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = { _id: payload?._id, role: payload?.role, };

      return true;

    } catch (error) {
      // throw new UnauthorizedException('لطفا توکن را وارد نماید');
      response.status(401).json({
        success: false,
        message: error.message || 'توکن نامعتبر است',
      });
      return false; // مانع ادامه‌ی اجرا
    }

  }
}
