import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApiKeyGuard } from './common/guards/api_key.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  //? فعال کردن validation در تمام ورودی‌ها
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      //? فقط فیلدهای تعریف شده در DTO قبول می‌شوند
    forbidNonWhitelisted: true, //? اگر فیلد اضافی بود ارور بده
    transform: true       //? داده‌ها را به instance کلاس تبدیل می‌کند
  }));

  //? Enable CORS
  app.enableCors();


  //? Serve static files from files directory
  app.useStaticAssets(join(__dirname, '..', 'files'), { prefix: '/files/' });

  app.useGlobalGuards(new ApiKeyGuard());

  //? Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();

  //? .Add more Swagger configuration as needed
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  //? Start the application
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
