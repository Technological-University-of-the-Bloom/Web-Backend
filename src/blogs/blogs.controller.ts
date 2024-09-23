import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from 'src/DTO/create-blog.dto';
import { Blog } from 'src/schemas/blogs.schema';

@Controller('blogs') //localhost:3000/blogs
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id') //localhost:3000/blogs/id
  findOne(@Param() params: string): string {
    return `get blog ${params}`;
  }

  @Post('create') //localhost:3000/blogs/create
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }

  @Put('update/:id') //localhost:3000/blogs/update/id
  updateBlog(): string {
    return 'updated blog';
  }

  @Delete('delete/:id') //localhost:3000/blogs/id
  deleteBlog(): string {
    return 'delete blog';
  }
}
