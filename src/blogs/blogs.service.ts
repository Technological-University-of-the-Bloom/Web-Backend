import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Blog } from 'src/schemas/blogs.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from 'src/DTO/create-blog.dto';
import { Connection } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectConnection() private connection: Connection,
  ) {}

  findAll(): string {
    return 's';
  }

  findOne(): string {
    return 's';
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    console.log(`created new blog:  ${createdBlog}`);
    return createdBlog.save();
  }
}
