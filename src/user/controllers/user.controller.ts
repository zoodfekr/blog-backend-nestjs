import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserQueryDto } from '../dto/user-query.dto';
import { FarsiPipe } from 'src/common/pipes/farsi.pipe';
import { MobilePipe } from 'src/common/pipes/mobile.pipe';
import { PasswordPipe } from 'src/common/pipes/password.pipe';
import { PasswordInterceptor } from 'src/common/interceptors/password.interceptor';
import { updateUserDto } from '../dto/user-update.dto';
import { UserService } from '../services/user.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';

@ApiTags('User')
@Controller('user')
@UseInterceptors(PasswordInterceptor)
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    allblog(@Query() queryparams: UserQueryDto) {
        return this.userService.findAll(queryparams);
    }


    @Get(':id')
    blogByid(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    createpost(@Body(FarsiPipe, MobilePipe, PasswordPipe) body: UserDto) {
        return this.userService.create(body);
    }

    @Put(':id')
    updatepost(
        @Param('id') id: string,
        @Body(FarsiPipe, MobilePipe, PasswordPipe) body: updateUserDto
    ) {
        return this.userService.update(id, body);
    }


    @Delete(':id')
    deletepost(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
