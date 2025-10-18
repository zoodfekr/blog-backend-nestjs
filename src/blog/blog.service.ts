import { Injectable } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {

    blogs = [
        { id: 1, title: 'First Blog', content: 'This is the content of the first blog.' },
        { id: 2, title: 'Second Blog', content: 'This is the content of the second blog.' }
    ];

    getAllBlogs() {
        return this.blogs;
    }

    getBlogById(id: number) {
        return this.blogs.find(blog => blog.id === id);
    }

    createBlog(body: BlogDto) {
        const newBlog = {
            id: this.blogs.length + 1,
            title: body.title,
            content: body.content
        };
        this.blogs.push(newBlog);
        return newBlog;
    }

    updateBlog(id: number, body: BlogDto) {
        const blog = this.getBlogById(id);
        if (blog) {
            blog.title = body.title;
            blog.content = body.content;
        }
        return blog;
    }

    deleteBlog(id: number) {
        const index = this.blogs.findIndex(blog => blog.id === id);
        if (index !== -1) {
            const deletedBlog = this.blogs.splice(index, 1);
            return deletedBlog[0];
        }
        return null;
    }
}
