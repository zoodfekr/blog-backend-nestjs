import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class BlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    category: string;
}
