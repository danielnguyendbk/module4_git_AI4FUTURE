import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Document } from './../src/documents/documents.entity';

describe('DocumentsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const createDocument = async (payload: {
    userId: number;
    title: string;
    content: string;
  }): Promise<Document> => {
    const res = await request(app.getHttpServer())
      .post('/documents')
      .send(payload)
      .expect(201);
    return res.body as Document;
  };

  it('POST /documents - tao document moi voi userId', async () => {
    const document = await createDocument({
      userId: 3,
      title: 'Bao cao',
      content: 'Noi dung bao cao',
    });

    expect(document.id).toBeDefined();
    expect(document.userId).toBe(3);
    expect(document.title).toBe('Bao cao');
    expect(document.createdAt).toBeDefined();
  });

  it('POST /documents - thieu userId thi tra ve 400', () => {
    return request(app.getHttpServer())
      .post('/documents')
      .send({ title: 'Bao cao', content: 'Noi dung bao cao' })
      .expect(400);
  });

  it('GET /documents - tra ve danh sach documents', async () => {
    await createDocument({ userId: 1, title: 'Doc 1', content: 'Noi dung 1' });
    await createDocument({ userId: 2, title: 'Doc 2', content: 'Noi dung 2' });

    const res = await request(app.getHttpServer())
      .get('/documents')
      .expect(200);
    const documents = res.body as Document[];

    expect(documents).toHaveLength(2);
  });

  it('GET /documents?userId=2 - loc documents theo userId', async () => {
    await createDocument({ userId: 1, title: 'Doc 1', content: 'Noi dung 1' });
    await createDocument({ userId: 2, title: 'Doc 2', content: 'Noi dung 2' });
    await createDocument({ userId: 2, title: 'Doc 3', content: 'Noi dung 3' });

    const res = await request(app.getHttpServer())
      .get('/documents?userId=2')
      .expect(200);
    const documents = res.body as Document[];

    expect(documents).toHaveLength(2);
    expect(documents.every((document) => document.userId === 2)).toBe(true);
  });

  it('GET /documents/:id - tra ve chi tiet document', async () => {
    const created = await createDocument({
      userId: 1,
      title: 'Doc 1',
      content: 'Noi dung 1',
    });

    const res = await request(app.getHttpServer())
      .get(`/documents/${created.id}`)
      .expect(200);
    const document = res.body as Document;

    expect(document.id).toBe(created.id);
  });

  it('PATCH /documents/:id - cap nhat document', async () => {
    const created = await createDocument({
      userId: 1,
      title: 'Doc 1',
      content: 'Noi dung 1',
    });

    const res = await request(app.getHttpServer())
      .patch(`/documents/${created.id}`)
      .send({ title: 'Doc 1 (moi)' })
      .expect(200);
    const document = res.body as Document;

    expect(document.title).toBe('Doc 1 (moi)');
  });

  it('DELETE /documents/:id - xoa document', async () => {
    const created = await createDocument({
      userId: 1,
      title: 'Doc 1',
      content: 'Noi dung 1',
    });

    await request(app.getHttpServer())
      .delete(`/documents/${created.id}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/documents/${created.id}`)
      .expect(404);
  });

  it('GET /documents/:id - tra ve 404 khi khong ton tai', () => {
    return request(app.getHttpServer()).get('/documents/999').expect(404);
  });
});
