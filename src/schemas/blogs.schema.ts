import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Blog {
  @Prop()
  titulo: string;

  @Prop({ type: Date })
  fecha: Date;

  @Prop()
  tag: string;

  @Prop()
  autor: string;

  @Prop()
  cuerpo: string;

  @Prop()
  imagen: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
