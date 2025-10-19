import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    content: string;

}
