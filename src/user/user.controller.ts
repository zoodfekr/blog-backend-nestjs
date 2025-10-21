import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserQueryDto } from './dto/user-query.dto';

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
    createpost(@Body() body: UserDto) {
        return this.userService.create(body);
    }

    @Put(':id')
    updatepost(@Param('id') id: string, @Body() body: UserDto) {
        return this.userService.update(id, body);
    }


    @Delete(':id')
    deletepost(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
