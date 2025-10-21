import { ArgumentMetadata, BadRequestException, FileTypeValidator, Injectable, MaxFileSizeValidator, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {


    if (!value || !Array.isArray(value)) {
      throw new BadRequestException('No files uploaded');
    }

    const sizeValidator = new MaxFileSizeValidator({ maxSize: 20000000 });
    const typeValidator = new FileTypeValidator({ fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/ });

    for (const image of value) {
      if (!sizeValidator.isValid(image)) {
        throw new BadRequestException(`${image?.originalname ?? ''} - file is too large`);
      }
      if (!typeValidator.isValid(image)) {
        throw new BadRequestException(`${image.originalname} - is not acceptable`);
      }
    }

    return value;
  }
}
