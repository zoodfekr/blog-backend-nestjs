import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserQueryDto } from './dto/user-query.dto';
import { sortFunction } from 'src/common/utils/sort_utils';
import { sortEnum } from 'src/common/dtos/general.query.dto';
import { UserDto } from './dto/user.dto';
import { updateUserDto } from './dto/user-update.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
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




}
