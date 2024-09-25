import { IsString } from 'class-validator';

export class StudentProfileDto {
  @IsString()
  student_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  profile_picture_url: string;

  @IsString()
  program: string;
}
