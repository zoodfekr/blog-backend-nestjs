import { createParamDecorator, ExecutionContext } from '@nestjs/common';


const paramFunc = (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request?.user?._id || 'unknown'
}


export const User = createParamDecorator(paramFunc);
