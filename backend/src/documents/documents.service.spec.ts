import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    service = moduleRef.get<DocumentsService>(DocumentsService);
  });

  it('create - gan userId va luu document', () => {
    const dto: CreateDocumentDto = {
      userId: 3,
      title: 'Bao cao',
      content: 'Noi dung bao cao',
    };

    const document = service.create(dto);

    expect(document.id).toBeDefined();
    expect(document.userId).toBe(3);
    expect(document.title).toBe('Bao cao');
    expect(document.createdAt).toBeInstanceOf(Date);
    expect(service.findAll()).toHaveLength(1);
  });

  it('create - moi document tu dong tang id', () => {
    const dto: CreateDocumentDto = {
      userId: 1,
      title: 'Doc 1',
      content: 'Noi dung 1',
    };

    const first = service.create(dto);
    const second = service.create(dto);

    expect(second.id).toBe(first.id + 1);
  });

  it('findAll - tra ve tat ca documents khi khong truyen userId', () => {
    service.create({ userId: 1, title: 'A', content: 'a' });
    service.create({ userId: 2, title: 'B', content: 'b' });

    expect(service.findAll()).toHaveLength(2);
  });

  it('findAll - loc documents theo userId', () => {
    service.create({ userId: 1, title: 'A', content: 'a' });
    service.create({ userId: 2, title: 'B', content: 'b' });
    service.create({ userId: 1, title: 'C', content: 'c' });

    const result = service.findAll(1);

    expect(result).toHaveLength(2);
    expect(result.every((document) => document.userId === 1)).toBe(true);
  });

  it('findOne - tra ve document khi ton tai', () => {
    const created = service.create({ userId: 2, title: 'B', content: 'b' });

    expect(service.findOne(created.id)).toEqual(created);
  });

  it('findOne - throw NotFoundException khi khong ton tai', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('update - cap nhat tieu de va noi dung', () => {
    const created = service.create({ userId: 2, title: 'B', content: 'b' });

    const updated = service.update(created.id, { title: 'B (moi)' });

    expect(updated.title).toBe('B (moi)');
    expect(updated.userId).toBe(2);
  });

  it('remove - xoa document', () => {
    const created = service.create({ userId: 2, title: 'B', content: 'b' });

    service.remove(created.id);

    expect(() => service.findOne(created.id)).toThrow(NotFoundException);
    expect(service.findAll()).toHaveLength(0);
  });
});
