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

@Controller('blogs') //172.16.21.12:3000/blogs
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id') //172.16.21.12:3000/blogs/:id
  async findOne(@Param('id') id: string): Promise<Blog | null> {
    const blog = await this.blogService.findOne(id.trim());
    if (!blog) {
      throw new Error(`Blog with id ${id} not found.`);
    }
    return blog;
  }

  @Post('create') //172.16.21.12:3000/blogs/create
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }

  @Put('update/:id') //172.16.21.12:3000/blogs/update/:id
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto, // Cambia a UpdateBlogDto
  ): Promise<Blog> {
    const cleanedId = id.trim(); // Limpiar el id
    const updatedBlog = await this.blogService.updateBlog(
      cleanedId,
      updateBlogDto,
    );

    if (!updatedBlog) {
      throw new Error(`Blog with id ${cleanedId} not found.`);
    }

    return updatedBlog;
  }

  @Delete('delete/:id') //172.16.21.12:3000/blogs/delete/:id
  async findByIdAndDelete(@Param('id') id: string): Promise<string> {
    const cleanedId = id.trim(); // Limpiar el id
    const result = await this.blogService.deletePost(cleanedId);
    if (!result) {
      return `Blog with id ${cleanedId} not found.`;
    }
    return `Blog with id ${cleanedId} deleted successfully.`;
  }
}
