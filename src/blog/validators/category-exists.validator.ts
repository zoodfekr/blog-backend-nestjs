import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoryExistsValidator {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) {}

    async validate(categoryId: string): Promise<boolean> {
        if (!categoryId) {
            return false;
        }

        try {
            const category = await this.categoryModel.findById(categoryId).exec();
            return !!category;
        } catch (error) {
            return false;
        }
    }
}
