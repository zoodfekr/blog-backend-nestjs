import { IsNotEmpty, IsString } from "class-validator";

export class signInDto {

    @IsString()
    @IsNotEmpty()
    userName?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;

}
