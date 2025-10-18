import { IsEnum, IsOptional, IsString } from "class-validator";

export enum sortEnum {
    Title = 'title',
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt'
}

export class GeneralQueryDto {

    @IsOptional()
    @IsString()
    page?: number;

    @IsString()
    @IsOptional()
    limit?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    @IsEnum(sortEnum)
    sort?: sortEnum;
}