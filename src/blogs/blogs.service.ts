import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Blog } from 'src/schemas/blogs.schema';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from 'src/DTO/create-blog.dto';
import { Connection } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectConnection() private connection: Connection,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string | Types.ObjectId): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  } 
  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    console.log(`created new blog:  ${createdBlog}`);
    return createdBlog.save();
  }
  async deletePost(id: string | Types.ObjectId): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
  async updateBlog(
    id: string | Types.ObjectId, 
    updateBlogDto: CreateBlogDto,
  ): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
      new: true, // Retorna el documento actualizado
      useFindAndModify: false, // Evita advertencias de Mongoose
    }).exec();
  }
  
}
