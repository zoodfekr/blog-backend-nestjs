import { Body, Controller, Post } from '@nestjs/common';
import { signInDto } from '../dto/sign-in.dto';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sign in')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    blogByid(@Body() body: signInDto) {
        return this.userService.signin(body);
    }


}
