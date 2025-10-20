import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app.service';


@Injectable()
export class LogInterceptor implements NestInterceptor {

  constructor(private readonly appService: AppService) { }


  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    console.log('📥 Request Info:');
    console.log('Method:', request.method);
    console.log('URL:', request.url);
    // console.log('Headers:', request.headers);
    // console.log('Body:', request.body);

    console.log('interceprtor before');

    return next.handle().pipe(
      tap(async (res) => {
        if (request.method != 'GET') {
          await this.appService.log({
            type: request.method,
            content: JSON.stringify(res),
            url: request.url
          })
        }
      }),
    );
  }
}
