import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentProfileDto } from 'src/DTO/student-profile.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':studentId/profile')
  async getStudentProfile(
    @Param('studentId') studentId: string,
  ): Promise<StudentProfileDto> {
    return this.studentService.getStudentProfile(studentId);
  }
}
