import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;


    if (value?.password) {

      const validPass = passwordRegex.test(value?.password)

      if (!validPass) {
        throw new BadRequestException("رمز عبور باید حداقل 8 کاراکتر شامل  حروف بزرگ و کوچک و عدد و یک کاراکتر خاص باشد")
      }

      return value;

    }

    return value;
  }
}
