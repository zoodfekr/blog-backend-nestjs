
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppService } from 'src/app.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();

    console.log('📥 Request Info:', request.method, request['user']);

    return next.handle().pipe(
      tap((res) => {
        if (request.method !== 'GET') {

          console.log('LogInterceptor ');

          from(this.appService.log({
            type: request.method,
            content: JSON.stringify(res),
            url: request.url,
            user: request['user']?._id || null,
          }))
            .subscribe({ error: (err) => console.error('Log Error:', err) });
        }
      }),
    );
  }
}
