import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schemas/student.schema';
import { StudentProfileDto } from 'src/DTO/student-profile.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async getStudentProfile(studentId: string): Promise<StudentProfileDto> {
    const student = await this.studentModel
      .findOne({ student_id: studentId })
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return {
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      profile_picture_url: student.profile_picture_url,
      program: student.academic_information.program,
    };
  }
}
