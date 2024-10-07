import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';
import { Multer } from 'multer';

//localhost:3000/imagenStudent
@Controller('imagenStudent')   // The base route for image operations
export class ImageController { 
  constructor(private readonly imageService: ImageService) {}

  @Post(':id')//localhost:3000/imagenStudent/id 1 2 3
  @UseInterceptors(FileInterceptor('file'))  // Intercepts the file upload
  async uploadImage(@Param('id') id: string, @UploadedFile() file: any) {
    try {
      const fileName = await this.imageService.uploadImage(file, id);
      return { message: 'File uploaded successfully', fileName };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':fileName')
  async getImage(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const imageBuffer = this.imageService.getImage(fileName);
      res.setHeader('Content-Type', 'image/jpeg');  // Assuming the images are jpeg
      res.send(imageBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
