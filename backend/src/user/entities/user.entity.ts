import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Alice' })
  name: string;

  @ApiPropertyOptional({ example: 25 })
  age?: number;

  @ApiProperty({ example: '2026-08-12T08:10:39.818Z' })
  createdAt: Date;
}
