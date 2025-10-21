import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {

        // تابع کمکی برای حذف password از هر آبجکت یا آرایه
        const removePassword = (data: any): any => {
          if (!data) return data;

          // اگر آرایه است، به ازای هر آیتم حذف می‌کنیم
          if (Array.isArray(data)) {
            return data.map(item => removePassword(item));
          }

          // اگر آبجکت است، password را حذف می‌کنیم
          if (typeof data === 'object') {
            const { password, ...rest } = data;
            return rest;
          }

          // اگر نوع داده چیز دیگری بود (string, number, ...) همان را برگردان
          return data;
        };

        return removePassword(response);
      }),
    );
  }
}
