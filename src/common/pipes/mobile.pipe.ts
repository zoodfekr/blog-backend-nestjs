import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { convertNumber } from '../utils/convertNumber';

@Injectable()
export class MobilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {


    const iranMobileRegex = /^09\d{9}$/;

    const englishNumber = convertNumber(value?.mobile)  //?تیدل شماره به انگلیسی

    if (value?.mobile) {

      const isValidMobile = iranMobileRegex.test(englishNumber)

      if (!isValidMobile) {
        throw new BadRequestException('شماره همراه را صحیح وارد نمائید');
      }
      return { ...value, mobile: englishNumber };
    }
    return value;
  }
}
