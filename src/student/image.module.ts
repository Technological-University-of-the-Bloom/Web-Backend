import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  providers: [ImageService], // Register ImageService
  controllers: [ImageController], // Register ImageController
})
export class ImageModule {}
