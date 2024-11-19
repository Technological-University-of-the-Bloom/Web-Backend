import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  controllers: [DocumentsController],  // Añade DocumentsController aquí
  providers: [DocumentsService],
})
export class DocumentsModule {}