import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export enum folderEnum {
    Avatar = "avatars",
    Blog = 'blog',
    Category = 'category'
}

export class UplpoadFileDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    file: any;

    @IsEnum(folderEnum)
    folder: folderEnum;

    @IsOptional()
    height?: number;

    @IsOptional()
    width?: number;

}