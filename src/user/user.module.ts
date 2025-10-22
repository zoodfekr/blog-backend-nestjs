import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService],
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])]
})
export class UserModule { }
