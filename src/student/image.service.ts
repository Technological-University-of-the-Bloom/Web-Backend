import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { Multer } from 'multer';
import { join } from 'path';

@Injectable()
export class ImageService {
  private readonly uploadPath = './uploads';  // Path to store images

  constructor() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadImage(file: any, id: string): Promise<string> {
    if (!file) {
      throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
    }
    const fileName = `${id}-${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);
    writeFileSync(filePath, file.buffer);
    return fileName;
  }

  getImage(fileName: string): Buffer {
    const filePath = join(this.uploadPath, fileName);
    if (!existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return readFileSync(filePath);
  }
}
