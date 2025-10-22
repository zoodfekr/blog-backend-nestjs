import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {

        const extractDoc = (data: any): any => {
          if (!data) return data;

          // اگر آرایه است، همه‌ی اعضا را بررسی کن
          if (Array.isArray(data)) {
            return data.map(item => extractDoc(item));
          }

          // اگر سند Mongoose است و دارای _doc است
          if (data && typeof data === 'object') {
            if (data._doc) {
              const { password, __v, ...rest } = data._doc; // حذف password و بقیه رو نگه دار
              return rest;
            }

            // اگر آبجکت معمولی است، پس بازگشتی بررسی کن
            const newObj: any = {};
            for (const key in data) {
              newObj[key] = extractDoc(data[key]);
            }
            return newObj;
          }

          return data;
        };

        return extractDoc(response);
      }),
    );
  }
}
