import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/controllers/blog.controller';
import { BlogService } from './blog/services/blog.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogFilter } from './common/filters/log.filter';
import { Log, LogSchema } from './common/schema/blog.schema';
import { ConfigModule } from '@nestjs/config';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { TimeMiddleware } from './common/middlewares/time.middleware';
import { UserModule } from './user/user.module';
import { DuplicateFilter } from './common/filters/duplicate.filter';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // تا در همه جا قابل دسترسی باشه
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    BlogModule,
    MongooseModule.forRoot(process.env.DB_url || ''),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema
      }
    ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LogInterceptor,
    // { provide: APP_FILTER, useClass: LogFilter },  //? برای مدیریت خطاها
    { provide: APP_FILTER, useClass: DuplicateFilter },  //? برای مدیریت خطاها
  ],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeMiddleware).forRoutes('*')
  }
}
