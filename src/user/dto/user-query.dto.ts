import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { GeneralQueryDto } from 'src/common/dtos/general.query.dto';

export class UserQueryDto extends GeneralQueryDto {

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    mobile?: string;

}
