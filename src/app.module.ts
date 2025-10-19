import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/controllers/blog.controller';
import { BlogService } from './blog/services/blog.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot('mongodb://localhost/nest-app'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
