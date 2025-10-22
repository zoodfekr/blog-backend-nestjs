import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class DuplicateFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {


    const response = host.switchToHttp().getResponse()


    console.log('exception>>', exception);

    if (exception && exception["code"] === 11000) {

      const duplicatedItem = exception['keyValue'] ? Object.keys(exception['keyValue'])[0] : 'unknown'

      response.send({
        message: `${duplicatedItem} این مورد قبلا ثبت شده است`,
        statusCode: 409
      })
    }

    throw exception;

  }
}
