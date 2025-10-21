import { Injectable, NestMiddleware } from '@nestjs/common';
import { time, timeEnd } from 'console';

@Injectable()
export class TimeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    time('time')

    res.on('finish', () => {
      timeEnd('time')
    })
    next();
  }
}
