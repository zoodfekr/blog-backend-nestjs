import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export enum folderEnum {
    Blog = 'blog',
}

export class UplpoadFilesDto {

    @ApiProperty({ 
        type: 'array', 
        items: { 
            type: 'string', 
            format: 'binary' 
        },
        description: 'Array of files to upload'
    })
    @IsOptional()
    files: any[];

    @ApiProperty({ enum: folderEnum, description: 'Folder to save files in' })
    @IsEnum(folderEnum)
    folder: folderEnum;

    @ApiProperty({ required: false, description: 'Image height' })
    @IsOptional()
    height?: number;

    @ApiProperty({ required: false, description: 'Image width' })
    @IsOptional()
    width?: number;

}