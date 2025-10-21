import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserQueryDto } from './dto/user-query.dto';
import { FarsiPipe } from 'src/common/pipes/farsi.pipe';
import { MobilePipe } from 'src/common/pipes/mobile.pipe';
import { PasswordPipe } from 'src/common/pipes/password.pipe';
import { PasswordInterceptor } from 'src/common/interceptors/password.interceptor';
import { updateUserDto } from './dto/user-update.dto';

@ApiTags('User')
@Controller('user')
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
    @UseInterceptors(PasswordInterceptor)
    createpost(@Body(FarsiPipe, MobilePipe, PasswordPipe) body: UserDto) {
        return this.userService.create(body);
    }

    @Put(':id')
    @UseInterceptors(PasswordInterceptor)
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
