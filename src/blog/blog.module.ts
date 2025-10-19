import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { CategorySchema } from './schemas/category.schema';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './schemas/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Blog.name,
                schema: BlogSchema
            },
            {
                name: Category.name,
                schema: CategorySchema
            },

        ]),
    ],
    controllers: [BlogController, CategoryController],
    providers: [BlogService, CategoryService],
})
export class BlogModule {}
