import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";



export class DeleteFileDto {
    @ApiProperty({ 
        description: 'Name of the file to delete (including folder path)', 
        example: 'blog/1760893798118-22670.webp' 
    })
    @IsNotEmpty()
    name: string;
}