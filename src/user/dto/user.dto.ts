import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
