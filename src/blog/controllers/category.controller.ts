import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BlogDto } from '../dto/blog.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dto/blog-query.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dto/category.dto';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('Blog Category')
@Controller('categorys')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class CategoryController {


    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    allcategory(@Query() queryparams: CategoryQueryDto) {
        return this.categoryService.getAllCategory(queryparams);
    }


    @Get(':id')
    categoryByid(@Param('id') id: string) {
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    createcategory(
        @Body() body: CategoryDto,
        @User() user: string
    ) {
        return this.categoryService.createCategory(body, user);
    }

    @Put(':id')
    updatecategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, body);
    }


    @Delete(':id')
    deletecategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }

}
