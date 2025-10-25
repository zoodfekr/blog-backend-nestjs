import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('توکن ارسال نشده است');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('ساختار توکن اشتباه است');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (!payload?._id) {
        throw new ForbiddenException('توکن معتبر نیست');
      }

      // قرار دادن اطلاعات کاربر در request برای دسترسی در کنترلرها
      request['user'] = {
        _id: payload._id,
        role: payload.role,
      };

      return true;
    } catch (error) {
      // بررسی نوع خطا برای نمایش پیام دقیق‌تر
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('توکن منقضی شده است');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('توکن نامعتبر است');
      }

      throw new UnauthorizedException('دسترسی غیرمجاز');
    }
  }
}
