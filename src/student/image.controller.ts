import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Para manejar la subida de archivos
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  unlinkSync,
} from 'fs'; // Módulo 'fs' para el manejo de archivos
import { join } from 'path'; // Módulo 'path' para manejar rutas de archivos

@Controller('images') // Define un prefijo de ruta para las rutas del controlador
export class ImageController {
  private readonly uploadPath = './uploads';

  constructor() {
    if (!existsSync(this.uploadPath)) {
      console.log('Creating uploads directory');
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file')) // Middleware para manejar archivos subidos
  async uploadImage(
    @UploadedFile() file: any,
    @Param('id') id: string,
  ): Promise<string> {
    if (!file) {
      console.error('No file provided');
      throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
    }
    const fileName = `${id}-${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);
    console.log(`Saving file: ${filePath}`);
    writeFileSync(filePath, file.buffer);
    return fileName;
  }

  @Get(':fileName')
  getImage(@Param('fileName') fileName: string): Buffer {
    const filePath = join(this.uploadPath, fileName);
    console.log(`Looking for file: ${filePath}`);
    if (!existsSync(filePath)) {
      console.error('File not found');
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return readFileSync(filePath);
  }

  @Get()
  getAllImages(): string[] {
    try {
      console.log('Reading files from uploads directory');
      const files = readdirSync(this.uploadPath);
      console.log(`Files found: ${files}`);
      return files;
    } catch (error) {
      console.error('Error reading files:', error.message);
      throw new HttpException(
        'Error reading files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':fileName')
  async deleteImage(@Param('fileName') fileName: string): Promise<void> {
    const filePath = join(this.uploadPath, fileName);
    console.log(`Deleting file: ${filePath}`);
    if (!existsSync(filePath)) {
      console.error('File to delete not found');
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    try {
      unlinkSync(filePath);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error.message);
      throw new HttpException(
        'Error deleting file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
