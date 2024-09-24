import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  titulo: string;

  //@IsDate()
  fecha: Date;

  @IsString()
  tag: string;

  @IsString()
  autor: string;

  @IsString()
  cuerpo?: string;

  @IsString()
  imagen: string;
}
