import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';
import { LogType } from '../schema/blog.schema';

@Catch()
export class LogFilter implements ExceptionFilter {
  constructor(private readonly appService: AppService) { }

  async catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // بررسی نوع خطا
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.getResponse() : { message: (exception as any)?.message || 'Internal server error' };

    // ارسال پاسخ به کاربر
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });

    // ذخیره لاگ
    await this.appService.log({
      type: LogType.Error,
      content: JSON.stringify(message),
      url: request.url
    });
  }
}
