import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class JwtFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {


    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.getResponse() : { message: (exception as any)?.message || 'Internal server error' };


    // ارسال پاسخ به کاربر
    response.status(status).json({
      statusCode: status,
      message,
    });

  }
}
