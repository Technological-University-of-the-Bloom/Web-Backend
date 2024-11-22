import { Controller, Post, Get, Delete, Put, Param, UploadedFile, UseInterceptors, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string, // Recibe título
    @Body('keyContent') keyContent: string, // Recibe contenido clave
    @Res() res: Response,
  ): Promise<void> {
    try {
      const document = await this.documentsService.saveFile(file, title, keyContent);
      res.status(HttpStatus.CREATED).json({
        message: `Documento ${document.name} subido y almacenado con éxito.`,
        id: document.id,
        title: document.title,
        keyContent: document.keyContent,
        content: document.content,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

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

  @Get('id/:id') //  obtener por ID
  getDocumentById(@Param('id') id: string, @Res() res: Response): void {
    const document = this.documentsService.getDocumentById(id);
    if (document) {
      res.status(HttpStatus.OK).json({
        id: document.id,
        name: document.name,
        content: document.content,
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con ID ${id} no encontrado.`,
      });
    }
  }

  @Get('search') //  búsqueda por palabras clave
  searchDocuments(@Query('keyword') keyword: string, @Res() res: Response): void {
    if (!keyword) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Debe proporcionar una palabra clave para la búsqueda.',
      });
      return;
    }

    const results = this.documentsService.searchDocumentsByKeyword(keyword);
    if (results.length > 0) {
      res.status(HttpStatus.OK).json(results);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `No se encontraron documentos con la palabra clave "${keyword}".`,
      });
    }
  }
  //Get All
  @Get()
  listAllDocuments(@Res() res: Response): void {
    const documents = this.documentsService.listDocuments();
    res.status(HttpStatus.OK).json(documents);
  }
  //GETALL DOCUMENTS
  @Get()
getAllDocuments(@Res() res: Response): void {
  const documents = this.documentsService.listDocuments();
  if (documents.length > 0) {
    res.status(HttpStatus.OK).json(documents);
  } else {
    res.status(HttpStatus.NOT_FOUND).json({
      message: 'No se encontraron documentos.',
    });
  }
}
//Put method
@Put(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('keyContent') keyContent: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const updatedDocument = await this.documentsService.updateDocument(id, title, keyContent);
      res.status(HttpStatus.OK).json({
        message: 'Documento actualizado con éxito.',
        document: updatedDocument,
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

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

  @Delete('id/:id') //  eliminar por ID
  deleteDocumentById(@Param('id') id: string, @Res() res: Response): void {
    const success = this.documentsService.deleteDocumentById(id);
    if (success) {
      res.status(HttpStatus.OK).json({
        message: `Documento con ID ${id} eliminado con éxito.`,
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con ID ${id} no encontrado.`,
      });
    }
  }
}
