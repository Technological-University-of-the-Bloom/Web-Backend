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
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id') //localhost:3000/blogs/:id
  async findOne(@Param('id') id: string): Promise<Blog | null> {
    const blog = await this.blogService.findOne(id.trim());
    if (!blog) {
      throw new Error(`Blog with id ${id} not found.`);
    }
    return blog;
  }

  @Post('create') //localhost:3000/blogs/create
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }

  @Put('update/:id') //localhost:3000/blogs/update/:id
  updateBlog(@Param('id') id: string): string {
    return `Blog with id ${id} updated successfully.`;
  }

  @Delete('delete/:id') //localhost:3000/blogs/delete/:id
  async findByIdAndDelete(@Param('id') id: string): Promise<string> {
    const cleanedId = id.trim(); // Limpiar el id
    const result = await this.blogService.deletePost(cleanedId);
    if (!result) {
      return `Blog with id ${cleanedId} not found.`;
    }
    return `Blog with id ${cleanedId} deleted successfully.`;
  }
  
}
