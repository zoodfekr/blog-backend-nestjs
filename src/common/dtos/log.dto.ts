import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LogType } from '../schema/blog.schema';

export class LogDto {

    @IsNotEmpty()
    @IsEnum(LogType)
    type: LogType;


    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    url: string;

}
