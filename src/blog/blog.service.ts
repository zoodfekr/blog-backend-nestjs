import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from './dto/blog-query.dto';
import { sortFunction } from 'common/utils/sort_utils';
import { sortEnum } from 'common/dtos/general.query.dto';

@Injectable()
export class BlogService {

    // ?استفاده از اسکیمای بلاگ برای ارتباط با دیتابیس
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: Model<Blog>
    ) { }


    // ? دریافت همه بلاگ‌ها با پارامترهای کوئری
    async getAllBlogs(queryparams: BlogQueryDto) {

        const { page = 1, limit = 10, title, sort = sortEnum.CreatedAt } = queryparams;

        const queryObject: any = {};

        if (title) queryObject.title = { $regex: title, $options: 'i' };

        const sortOption = sortFunction(sort);

        let blog = await this.blogModel
            .find(queryObject)
            .sort(sortOption)
            .skip(page - 1)
            .limit(limit)
            .exec();

        let blog_len = await this.blogModel.countDocuments(queryObject); // تنظیم طول آرایه به مقدار limit

        return {
            length: +blog_len,
            page: +page,
            limit: +limit,
            sort,
            data: blog
        };
    }


    // ? دریافت بلاگ بر اساس آیدی
    async getBlogById(id: string) {
        return await this.blogModel.findById(id).exec();
    }

    // ? ایجاد بلاگ جدید
    async createBlog(body: BlogDto) {
        const newBlog = new this.blogModel(body);
        await newBlog.save();
        return newBlog;
    }

    // ? بروزرسانی بلاگ بر اساس آیدی
    async updateBlog(id: string, body: BlogDto) {
        const updatedBlog = await this.blogModel.findByIdAndUpdate(
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
    async deleteBlog(id: string) {
        const blog = await this.blogModel.findByIdAndDelete(id);
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
        return blog;
    }
}
