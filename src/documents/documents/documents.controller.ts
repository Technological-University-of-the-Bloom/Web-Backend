import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res, HttpStatus, Body } from '@nestjs/common'; // Importaciones necesarias
import { DocumentsService } from './documents.service'; // Servicio de documentos
import { Response } from 'express'; // Para manejar las respuestas HTTP
import { FileInterceptor } from '@nestjs/platform-express'; // Para manejar la subida de archivos

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {} // Inyección del servicio de documentos

  // Subir un documento junto con su título y contenido clave
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Usar interceptor para manejar la subida del archivo
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File, // Archivo subido
    @Body('title') title: string, // Título del documento
    @Body('keyContent') keyContent: string, // Contenido clave del documento
    @Res() res: Response, // Respuesta HTTP
  ): Promise<void> {
    try {
      // Llamar al servicio para guardar el archivo y los metadatos
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
        message: error.message, // Devolver el error si ocurre
      });
    }
  }

  // Obtener un documento por su nombre exacto
  @Get(':name')
  getDocument(@Param('name') name: string, @Res() res: Response): void {
    const document = this.documentsService.getDocumentByName(name); // Buscar el documento por nombre
    if (document) {
      res.status(HttpStatus.OK).json({
        id: document.id,
        name: document.name,
        content: document.content, // Devolver el contenido completo del documento
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con nombre ${name} no encontrado.`, // Si no se encuentra el documento
      });
    }
  }

  // Obtener todos los documentos
  @Get()
  listDocuments(@Res() res: Response): void {
    const documents = this.documentsService.listDocuments(); // Obtener todos los documentos
    res.status(HttpStatus.OK).json(documents); // Devolver los documentos en la respuesta
  }

  // Eliminar un documento por su nombre
  @Delete(':name')
  deleteDocument(@Param('name') name: string, @Res() res: Response): void {
    const success = this.documentsService.deleteDocumentByName(name); // Llamar al servicio para eliminar el documento
    if (success) {
      res.status(HttpStatus.OK).json({
        message: `Documento ${name} eliminado con éxito.`, // Si se elimina correctamente
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Documento con nombre ${name} no encontrado.`, // Si no se encuentra el documento
      });
    }
  }

  // Búsqueda avanzada por palabra clave en título, contenido o contenido clave
  @Get('search')
  searchDocuments(@Body('keyword') keyword: string, @Res() res: Response): void {
    const results = this.documentsService.searchDocuments(keyword); // Llamar al servicio de búsqueda
    res.status(HttpStatus.OK).json(results); // Devolver los documentos encontrados
  }
}
