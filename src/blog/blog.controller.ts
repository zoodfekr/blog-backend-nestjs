import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {


    constructor(private readonly blogService: BlogService) { }

    @Get()
    allblog() {
        return this.blogService.getAllBlogs();
    }


    @Get(':id')
    blogByid(@Param('id') id: string) {
        return this.blogService.getBlogById(+id);
    }

    @Post()
    createpost(@Body() body: BlogDto) {
        return this.blogService.createBlog(body);
    }

    @Put(':id')
    updatepost(@Param('id') id: string, @Body() body: BlogDto) {
        return this.blogService.updateBlog(+id, body);
    }


    @Delete(':id')
    deletepost(@Param('id') id: string) {
        return this.blogService.deleteBlog(+id);
    }

}
