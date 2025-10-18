import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sortFunction } from 'src/common/utils/sort_utils';
import { sortEnum } from 'src/common/dtos/general.query.dto';
import { Category } from '../schemas/category.schema';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {

    // ?استفاده از اسکیمای بلاگ برای ارتباط با دیتابیس
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>) { }


    // ? دریافت همه دسته بندی ها  با پارامترهای کوئری
    async getAllCategory(queryparams: CategoryQueryDto, select = { __v: 0 }) {

        const { page = 1, limit = 10, title, sort = sortEnum.CreatedAt } = queryparams;

        const queryObject: any = {};

        if (title) queryObject.title = { $regex: title, $options: 'i' };

        const sortOption = sortFunction(sort);

        let blog = await this.categoryModel
            .find(queryObject)
            .select(select)
            .sort(sortOption)
            .skip(page - 1)
            .limit(limit)
            .exec();

        let blog_len = await this.categoryModel.countDocuments(queryObject); // تنظیم طول آرایه به مقدار limit

        return {
            length: +blog_len,
            page: +page,
            limit: +limit,
            sort,
            data: blog
        };
    }


    // ? دریافت بلاگ بر اساس آیدی
    async getCategoryById(id: string, select = { __v: 0 }) {
        return await this.categoryModel.findById(id).select(select).exec();
    }

    // ? ایجاد بلاگ جدید
    async createCategory(body: CategoryDto) {
        const newBlog = new this.categoryModel(body);
        await newBlog.save();
        return newBlog;
    }

    // ? بروزرسانی بلاگ بر اساس آیدی
    async updateCategory(id: string, body: CategoryDto) {
        const updatedBlog = await this.categoryModel.findByIdAndUpdate(
            id,
            { title: body.title, content: body.content },
            { new: true } // برمی‌گردونه نسخه‌ی جدید بعد از آپدیت
        );
        if (!updatedBlog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }

        return updatedBlog;
    }

    // ? حذف بلاگ بر اساس آیدی
    async deleteCategory(id: string) {
        const blog = await this.categoryModel.findByIdAndDelete(id);
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
        return blog;
    }
}
