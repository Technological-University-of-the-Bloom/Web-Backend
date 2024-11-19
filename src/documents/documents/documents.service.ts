import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-parse';
import * as mammoth from 'mammoth';
import * as xlsx from 'xlsx';
import * as textract from 'textract';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// Interfaz para representar un documento
interface Document {
  id: string;
  name: string;
  content: string;
  filePath: string;
  title?: string; // Agregado: Campo opcional para almacenar el título del documento
  keyContent?: string; // Agregado: Campo opcional para almacenar el contenido clave del documento
}

@Injectable()
export class DocumentsService {
  private documents: Document[] = []; // Lista de documentos almacenados en memoria
  private readonly uploadDir = path.join(__dirname, 'uploads'); // Directorio donde se guardarán los archivos

  constructor() {
    // Crear el directorio de almacenamiento si no existe
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir); 
    }
  }

  // Guardar el archivo, extraer su contenido y almacenar los metadatos (título y contenido clave)
  async saveFile(file: Express.Multer.File, title: string, keyContent: string): Promise<Document> {
    const id = uuidv4(); // Generar un ID único para el documento
    const name = file.originalname; // Obtener el nombre original del archivo
    const filePath = path.join(this.uploadDir, name); // Ruta donde se almacenará el archivo

    // Guardar el archivo en el sistema de archivos
    fs.writeFileSync(filePath, file.buffer);

    // Extraer el contenido del archivo (según su tipo)
    const content = await this.extractContent(filePath);

    // Crear el documento con su ID, nombre, contenido, ruta y los metadatos proporcionados
    const newDocument: Document = { id, name, content, filePath, title, keyContent };
    this.documents.push(newDocument); // Agregar el documento a la lista de documentos
    return newDocument; // Retornar el documento creado
  }

  // Método para extraer el contenido según el tipo de archivo
  async extractContent(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase(); // Obtener la extensión del archivo
    switch (ext) {
      case '.pdf':
        return this.extractPdfContent(filePath); // Extraer contenido de PDF
      case '.docx':
        return this.extractDocxContent(filePath); // Extraer contenido de DOCX
      case '.xlsx':
        return this.extractXlsxContent(filePath); // Extraer contenido de XLSX
      case '.txt':
        return this.extractTextContent(filePath); // Extraer contenido de TXT
      default:
        throw new Error('Tipo de archivo no soportado'); // Si el archivo no es de un tipo soportado
    }
  }

  // Extraer contenido de un archivo PDF
  async extractPdfContent(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath); // Leer el archivo PDF como buffer
    const data = await pdf(buffer); // Parsear el contenido del PDF
    return data.text; // Retornar el texto extraído del PDF
  }

  // Extraer contenido de un archivo DOCX
  async extractDocxContent(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath); // Leer el archivo DOCX como buffer
    const data = await mammoth.extractRawText({ buffer }); // Extraer el texto crudo del DOCX
    return data.value; // Retornar el texto extraído
  }

  // Extraer contenido de un archivo Excel (XLSX)
  async extractXlsxContent(filePath: string): Promise<string> {
    const workbook = xlsx.readFile(filePath); // Leer el archivo XLSX
    const sheetName = workbook.SheetNames[0]; // Obtener el primer nombre de la hoja
    const sheet = workbook.Sheets[sheetName]; // Obtener la hoja de trabajo
    const content = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // Convertir la hoja a JSON
    return JSON.stringify(content); // Retornar el contenido como una cadena JSON
  }

  // Extraer contenido de un archivo de texto (TXT)
  async extractTextContent(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      textract.fromFileWithPath(filePath, (error, text) => { // Usar textract para extraer el texto
        if (error) reject(error); // Si hay un error, rechazar la promesa
        resolve(text); // Retornar el texto extraído
      });
    });
  }

  // Obtener un documento por su nombre exacto
  getDocumentByName(name: string): Document | undefined {
    return this.documents.find(doc => doc.name === name); // Buscar el documento por nombre
  }

  // Obtener todos los documentos almacenados
  listDocuments(): Document[] {
    return this.documents; // Retornar todos los documentos
  }

  // Eliminar un documento por su nombre y borrar el archivo físicamente
  deleteDocumentByName(name: string): boolean {
    const index = this.documents.findIndex(doc => doc.name === name); // Buscar el documento
    if (index === -1) return false; // Si no se encuentra, retornar falso
    const [deletedDocument] = this.documents.splice(index, 1); // Eliminar el documento de la lista
    fs.unlinkSync(deletedDocument.filePath); // Eliminar el archivo del sistema
    return true; // Retornar verdadero si se eliminó correctamente
  }

  // Buscar documentos por palabra clave en el título, contenido o contenido clave
  searchDocuments(keyword: string): Document[] {
    return this.documents.filter(doc => {
      return (
        doc.title?.toLowerCase().includes(keyword.toLowerCase()) || // Buscar en el título
        doc.content.toLowerCase().includes(keyword.toLowerCase()) || // Buscar en el contenido
        doc.keyContent?.toLowerCase().includes(keyword.toLowerCase()) // Buscar en el contenido clave
      );
    });
  }
}
