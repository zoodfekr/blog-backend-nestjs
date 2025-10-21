import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import bcrypt from 'bcrypt'

@Injectable()
export class PasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;


    if (value?.password) {

      const validPass = passwordRegex.test(value?.password)

      if (!validPass) {
        throw new BadRequestException("رمز عبور باید حداقل 8 کاراکتر شامل  حروف بزرگ و کوچک و عدد و یک کاراکتر خاص باشد")
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(value.password, salt)

        return { ...value, password: hashedPass };
      }


    }

    return value;
  }
}
