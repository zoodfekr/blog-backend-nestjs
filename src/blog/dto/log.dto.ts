import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LogType } from 'src/common/schema/blog.schema';

export class LogDto {

    @IsNotEmpty()
    @IsEnum(LogType)
    type: LogType;


    @IsNotEmpty()
    @IsString()
    content: string;

}
