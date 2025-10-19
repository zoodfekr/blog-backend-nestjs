import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/controllers/blog.controller';
import { BlogService } from './blog/services/blog.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER } from '@nestjs/core';
import { LogFilter } from './common/filters/log.filter';
import { Log, LogSchema } from './common/schema/blog.schema';



const extraProviders = [
  { provide: APP_FILTER, useClass: LogFilter }  //? برای مدیریت خطاها
]

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot('mongodb://localhost/nest-app'),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ...extraProviders],
})
export class AppModule { }
