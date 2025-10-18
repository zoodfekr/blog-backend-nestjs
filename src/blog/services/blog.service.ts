import { Injectable, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { BlogDto } from '../dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../schemas/blog.schema';
import { Category } from '../schemas/category.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from '../dto/blog-query.dto';
import { sortFunction } from 'src/common/utils/sort_utils';
import { sortEnum } from 'src/common/dtos/general.query.dto';


@Injectable()
export class BlogService {

    // ?استفاده از اسکیمای بلاگ برای ارتباط با دیتابیس
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: Model<Blog>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) { }


    // ? دریافت همه بلاگ‌ها با پارامترهای کوئری
    async getAllBlogs(queryparams: BlogQueryDto, select = { __v: 0 }) {

        const { page = 1, limit = 10, title, sort = sortEnum.CreatedAt } = queryparams;

        const queryObject: any = {};

        if (title) queryObject.title = { $regex: title, $options: 'i' };

        const sortOption = sortFunction(sort);

        let blog = await this.blogModel
            .find(queryObject)
            .select(select)
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
    async getBlogById(id: string, select = { __v: 0 }) {
        return await this.blogModel.findById(id).select(select).exec();
    }

    // ? ایجاد بلاگ جدید
    async createBlog(body: BlogDto) {
        // بررسی وجود category
        const categoryExists = await this.categoryModel.findById(body.category).exec();
        if (!categoryExists) throw new BadRequestException(`Category with id ${body.category} not found`);

        const newBlog = new this.blogModel(body);
        await newBlog.save();
        return newBlog;
    }

    // ? بروزرسانی بلاگ بر اساس آیدی
    async updateBlog(id: string, body: BlogDto) {
        // بررسی وجود category اگر در body ارسال شده باشد
        if (body.category) {
            const categoryExists = await this.categoryModel.findById(body.category).exec();
            if (!categoryExists) throw new BadRequestException(`Category with id ${body.category} not found`);
        }

        const updatedBlog = await this.blogModel.findByIdAndUpdate(id, body, { new: true });
        if (!updatedBlog) throw new NotFoundException(`Blog with id ${id} not found`);
        return updatedBlog;
    }

    // ? حذف بلاگ بر اساس آیدی
    async deleteBlog(id: string) {
        const blog = await this.blogModel.findByIdAndDelete(id);
        if (!blog) throw new NotFoundException(`Blog with id ${id} not found`);
        return blog;
    }
}
