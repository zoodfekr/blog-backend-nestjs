import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';
import { LogType } from '../schema/blog.schema';
import { json } from 'stream/consumers';

@Catch()
export class LogFilter<T extends HttpException> implements ExceptionFilter {

  // *وارد کردن سرویس برای استفاده 
  constructor(private readonly appService: AppService) { }


  async catch(exception: T, host: ArgumentsHost) {


    // ? گرفتن پاسخ و درخواست
    const response = host.switchToHttp().getResponse<Response>()
    const request = host.switchToHttp().getRequest<Request>()

    //? گرفتن کد خطا
    const status = exception.getStatus();

    //? برای ارسال پاسخ به کاربر
    if (status.toString() === '404') {
      response.status(status).send({ statusCode: status, message: 'Resource not found' });
    } else {
      response.send(exception.getResponse());
    }

    // ?ذخیره در دیتابیس با استفاده از سرویس  مورد نظر
    await this.appService.log({
      type: LogType.Error,
      content: JSON.stringify(exception.getResponse())
    })

  }

}
