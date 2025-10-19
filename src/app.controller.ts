import { Controller, Get, Post, UseInterceptors, UploadedFile, BadRequestException, Body, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UplpoadFileDto } from './common/dtos/upload_file.dto';
import { saveImage } from './common/utils/file-utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('upload-file')
  @ApiConsumes('multipart/form-data') //! swagger
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UplpoadFileDto,
  ) {
    return saveImage(file, body);
  }

}


// npm i multer