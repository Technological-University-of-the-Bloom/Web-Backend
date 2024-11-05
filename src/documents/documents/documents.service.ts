import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const documentsPath = path.join(__dirname, '../../documents');

@Injectable()
export class DocumentsService {
  // Listar todos los documentos
  listDocuments(): string[] {
    if (!fs.existsSync(documentsPath)) fs.mkdirSync(documentsPath);
    return fs.readdirSync(documentsPath);
  }

  // Obtener un documento por su nombre
  getDocument(name: string): Buffer {
    const filePath = path.join(documentsPath, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Document ${name} not found`);
    }

    return fs.readFileSync(filePath);
  }

  // Crear un nuevo documento
  createDocument(name: string, content: string): string {
    const filePath = path.join(documentsPath, name);

    if (fs.existsSync(filePath)) {
      throw new ConflictException(`Document ${name} already exists`);
    }

    fs.writeFileSync(filePath, content);
    return `Document ${name} created successfully`;
  }

  // Actualizar un documento
  updateDocument(name: string, content: string): string {
    const filePath = path.join(documentsPath, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Document ${name} not found`);
    }

    fs.writeFileSync(filePath, content);
    return `Document ${name} updated successfully`;
  }

  // Eliminar un documento
  deleteDocument(name: string): string {
    const filePath = path.join(documentsPath, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Document ${name} not found`);
    }

    fs.unlinkSync(filePath);
    return `Document ${name} deleted successfully`;
  }
}
