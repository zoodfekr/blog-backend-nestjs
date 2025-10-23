import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sortFunction } from 'src/common/utils/sort_utils';
import { sortEnum } from 'src/common/dtos/general.query.dto';
import { signInDto } from '../dto/sign-in.dto';
import bcrypt from 'bcrypt'
import { User } from '../schema/user.schema';
import { UserQueryDto } from '../dto/user-query.dto';
import { UserDto } from '../dto/user.dto';
import { updateUserDto } from '../dto/user-update.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jweService: JwtService
    ) { }


    // ? یافتن تمام کاربران
    async findAll(queryParams: UserQueryDto, selectObject: any = { __v: 0 }) {
        const { limit = 5, page = 1, sort = sortEnum.CreatedAt, lastName, mobile } = queryParams;
        const query: any = {};
        if (lastName) query.lastName = { $regex: lastName, $options: 'i' };
        if (mobile) query.mobile = { $regex: mobile, $options: 'i' };
        const sortObject = sortFunction(sort);
        const users = await this.userModel
            .find(query)
            .sort(sortObject)
            .select(selectObject)
            .skip(page - 1)
            .limit(limit)
            .exec();
        const count = await this.userModel.countDocuments(query);
        return { count, users };
    }


    // ? پیدا کردن کاربر
    async findOne(id: string, selectObject: any = { __v: 0 }) {
        const user = await this.userModel
            .findOne({ _id: id })
            .select(selectObject)
            .exec();
        if (user) {
            return user;
        } else {
            throw new NotFoundException();
        }
    }

    async create(body: UserDto) {
        const newUser = new this.userModel(body);
        await newUser.save();
        return newUser;
    }

    async update(id: string, body: updateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, body, { new: true });
    }

    async delete(id: string) {
        const user = await this.findOne(id);
        await user.deleteOne();
        return user;
    }

    async findOneByMobile(mobile: string) {
        const user = await this.userModel.findOne({ mobile: mobile });

        if (user) {
            return user;
        } else {
            throw new NotFoundException();
        }
    }



    // ?  یافتن کاربر با نام کاربری
    findByUserName = async (username: string) => {
        const user = await this.userModel.findOne({ userName: username })
        if (user) return user
        throw new NotFoundException()
    }


    // ? ورود کاربر
    async signin(body: signInDto) {

        const { userName, password } = body;

        if (!userName || !password) throw new NotFoundException('نام کاربری و رمز عبور الزامی است');

        const user = await this.findByUserName(userName)

        if (!user) throw new NotFoundException('نام کاربری یا رمز عبور اشتباه است');

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');

        console.log('ورود موفق', user.userName);

        const userId = { _id: user._id }
        const token = this.jweService.sign(userId)

        // ! بی اعتبار کردن توکن قبلی بررسی شود

        return {
            message: 'ورود موفق',
            access_token: token,
            refresh_token: '',
            user: {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };

    }

}
