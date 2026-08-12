import { ApiProperty } from '@nestjs/swagger';

export class Document {
  @ApiProperty({ example: 1, description: 'Document ID' })
  id: number;

  @ApiProperty({ example: 3, description: 'Chu so huu document (user)' })
  userId: number;

  @ApiProperty({
    example: 'Bao cao AI4FUTURE',
    description: 'Tieu de document',
  })
  title: string;

  @ApiProperty({
    example: 'Noi dung chi tiet...',
    description: 'Noi dung document',
  })
  content: string;

  @ApiProperty({
    example: '2026-08-12T07:00:00.000Z',
    description: 'Thoi gian tao',
  })
  createdAt: Date;
}
