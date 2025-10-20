import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { BlogDto } from '../dto/blog.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dto/blog-query.dto';
import { ApiTags } from '@nestjs/swagger';
// import { LogInterceptor } from 'src/common/interceptors/log.interceptor';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {


    constructor(private readonly blogService: BlogService) { }

    @Get()
    allblog(@Query() queryparams: BlogQueryDto) {
        return this.blogService.getAllBlogs(queryparams);
    }


    @Get(':id')
    blogByid(@Param('id') id: string) {
        return this.blogService.getBlogById(id);
    }

    @Post()
    createpost(@Body() body: BlogDto) {
        return this.blogService.createBlog(body);
    }

    @Put(':id')
    updatepost(@Param('id') id: string, @Body() body: BlogDto) {
        return this.blogService.updateBlog(id, body);
    }


    @Delete(':id')
    deletepost(@Param('id') id: string) {
        return this.blogService.deleteBlog(id);
    }

}
