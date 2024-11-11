import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-parse';
import * as mammoth from 'mammoth';
import * as xlsx from 'xlsx';
import * as textract from 'textract';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Document {
  id: string;
  name: string;
  content: string;
  filePath: string;
}

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  private readonly uploadDir = path.join(__dirname, 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir); // Crear el directorio de almacenamiento si no existe
    }
  }

  // Guardar el archivo y extraer su contenido
  async saveFile(file: Express.Multer.File): Promise<Document> {
    const id = uuidv4();
    const name = file.originalname;
    const filePath = path.join(this.uploadDir, name);

    fs.writeFileSync(filePath, file.buffer); // Guardar archivo en el servidor

    const content = await this.extractContent(filePath);

    const newDocument: Document = { id, name, content, filePath };
    this.documents.push(newDocument);
    return newDocument;
  }

  // Extraer el contenido según el tipo de archivo
  async extractContent(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.pdf':
        return this.extractPdfContent(filePath);
      case '.docx':
        return this.extractDocxContent(filePath);
      case '.xlsx':
        return this.extractXlsxContent(filePath);
      case '.txt':
        return this.extractTextContent(filePath);
      default:
        throw new Error('Tipo de archivo no soportado');
    }
  }

  // Extraer contenido de un archivo PDF
  async extractPdfContent(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
  }

  // Extraer contenido de un archivo DOCX
  async extractDocxContent(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath);
    const data = await mammoth.extractRawText({ buffer });
    return data.value;
  }

  // Extraer contenido de un archivo Excel
  async extractXlsxContent(filePath: string): Promise<string> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const content = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return JSON.stringify(content);
  }

  // Extraer contenido de un archivo de texto
  async extractTextContent(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      textract.fromFileWithPath(filePath, (error, text) => {
        if (error) reject(error);
        resolve(text);
      });
    });
  }

  // Obtener un documento por su nombre
  getDocumentByName(name: string): Document | undefined {
    return this.documents.find(doc => doc.name === name);
  }

  // Obtener todos los documentos
  listDocuments(): Document[] {
    return this.documents;
  }

  // Eliminar un documento por su nombre
  deleteDocumentByName(name: string): boolean {
    const index = this.documents.findIndex(doc => doc.name === name);
    if (index === -1) return false;
    const [deletedDocument] = this.documents.splice(index, 1);
    fs.unlinkSync(deletedDocument.filePath); // Eliminamos el archivo físicamente
    return true;
  }
}
