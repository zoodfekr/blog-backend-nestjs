import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BlogDto } from '../dto/blog.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dto/blog-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dto/category.dto';

@ApiTags('Blog Category')
@Controller('categorys')
export class CategoryController {


    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    allcategory(@Query() queryparams: CategoryDto) {
        return this.categoryService.getAllCategory(queryparams);
    }


    @Get(':id')
    categoryByid(@Param('id') id: string) {
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    createcategory(@Body() body: CategoryDto) {
        return this.categoryService.createCategory(body);
    }

    @Put(':id')
    updatecategory(@Param('id') id: string, @Body() body: CategoryDto) {
        return this.categoryService.updateCategory(id, body);
    }


    @Delete(':id')
    deletecategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }

}
