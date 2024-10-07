import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student, StudentSchema } from 'src/schemas/student.schema';
//import { ImageModule } from './image/image.module';  // Import ImageModule to handle image logic
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    //ImageModule,  // Add ImageModule so image services are available in StudentModule
  ],
  controllers: [StudentController, ImageController],
  providers: [StudentService, ImageService],
})
export class StudentModule {}
