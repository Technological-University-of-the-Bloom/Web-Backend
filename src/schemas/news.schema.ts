import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class News {
  @Prop()
  titulo: string;

  @Prop()
  fecha: Date;

  @Prop()
  tags: string;

  @Prop()
  autor: string;

  @Prop()
  cuerpo: string;

  @Prop()
  imagen: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
