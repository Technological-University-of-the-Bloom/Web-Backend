import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { DocumentsModule } from './documents/documents/documents.module';
//import { ImageModule } from './image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.16.21.12:27017/nest'),
    BlogsModule,
    NewsModule,
    StudentModule,
    //ImageModule,
    StudentModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
