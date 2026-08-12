import { Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './documents.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  private readonly documents: Document[] = [];
  private nextId = 1;

  create(dto: CreateDocumentDto): Document {
    const document: Document = {
      id: this.nextId++,
      userId: dto.userId,
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
    };
    this.documents.push(document);
    return document;
  }

  findAll(userId?: number): Document[] {
    if (userId !== undefined) {
      return this.documents.filter((document) => document.userId === userId);
    }
    return this.documents;
  }

  findOne(id: number): Document {
    const document = this.documents.find((item) => item.id === id);
    if (!document) {
      throw new NotFoundException(`Document ${id} khong ton tai`);
    }
    return document;
  }

  update(id: number, dto: Partial<CreateDocumentDto>): Document {
    const document = this.findOne(id);
    if (dto.userId !== undefined) {
      document.userId = dto.userId;
    }
    if (dto.title !== undefined) {
      document.title = dto.title;
    }
    if (dto.content !== undefined) {
      document.content = dto.content;
    }
    return document;
  }

  remove(id: number): void {
    const index = this.documents.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Document ${id} khong ton tai`);
    }
    this.documents.splice(index, 1);
  }
}
