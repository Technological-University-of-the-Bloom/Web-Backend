import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Response } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  listDocuments(): string[] {
    return this.documentsService.listDocuments();
  }

  @Get(':name')
  getDocument(@Param('name') name: string, @Res() res: Response) {
    const file = this.documentsService.getDocument(name);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.status(HttpStatus.OK).send(file);
  }

  @Post()
  createDocument(
    @Body('name') name: string,
    @Body('content') content: string,
  ): string {
    return this.documentsService.createDocument(name, content);
  }

  @Put(':name')
  updateDocument(
    @Param('name') name: string,
    @Body('content') content: string,
  ): string {
    return this.documentsService.updateDocument(name, content);
  }

  @Delete(':name')
  deleteDocument(@Param('name') name: string): string {
    return this.documentsService.deleteDocument(name);
  }
}
