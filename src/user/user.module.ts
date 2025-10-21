import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService],
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])]
})
export class UserModule { }
