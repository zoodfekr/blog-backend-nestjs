import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FarsiPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const items = ['firstName', 'lastName'];
    const errors: string[] = [];
    const farsi = /^[\u0600-\u06FF\s]{2,}$/;

    if (metadata.type === 'body') {
      for (const key in value) {
        if (items.includes(key)) {
          if (value[key] && !farsi.test(value[key])) {
            errors.push(`فیلد ${key} باید به صورت فارسی وارد شود`);
          }
        }
      }

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }

    return value;
  }
}
