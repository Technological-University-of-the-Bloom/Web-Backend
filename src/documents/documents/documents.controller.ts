import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // Subir un documento local
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const document = await this.documentsService.saveFile(file);
      res.status(HttpStatus.CREATED).json({
        message: `Documento ${document.name} subido y almacenado con éxito.`,
        id: document.id,
        content: document.content,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  // Obtener un documento por su nombre
  @Get(':name')
  getDocument(@Param('name') name: string, @Res() res: Response): void {
    const document = this.documentsService.getDocumentByName(name);
    if (document) {
      res.status(HttpStatus.OK).json({
        id: document.id,
        name: document.name,
        content: document.content,
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con nombre ${name} no encontrado.`,
      });
    }
  }

  // Obtener todos los documentos
  @Get()
  listDocuments(@Res() res: Response): void {
    const documents = this.documentsService.listDocuments();
    res.status(HttpStatus.OK).json(documents);
  }

  // Eliminar un documento por su nombre
  @Delete(':name')
  deleteDocument(@Param('name') name: string, @Res() res: Response): void {
    const success = this.documentsService.deleteDocumentByName(name);
    if (success) {
      res.status(HttpStatus.OK).json({
        message: `Documento ${name} eliminado con éxito.`,
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con nombre ${name} no encontrado.`,
      });
    }
  }
}
