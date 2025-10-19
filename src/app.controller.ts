import { Controller, Get, Post, UseInterceptors, UploadedFile, BadRequestException, Body, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UplpoadFileDto } from './common/dtos/upload_file.dto';
import { saveImage, saveImages } from './common/utils/file-utils';
import { UplpoadFilesDto } from './common/dtos/upload_files.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a single file',
    type: UplpoadFileDto,
  })
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



  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple files',
    type: UplpoadFilesDto,
  })
  @UseInterceptors(FilesInterceptor('files', 10)) // Allow up to 10 files
  uploadFiles(
    @UploadedFiles(
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
    files: Array<Express.Multer.File>,
    @Body() body: UplpoadFilesDto,
  ) {
    return saveImages(files, body);
  }


}


// npm i multer