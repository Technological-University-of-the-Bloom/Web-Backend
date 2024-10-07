import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
//import { ImageModule } from './image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    BlogsModule,
    NewsModule,
    StudentModule,
    //ImageModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
