import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({ example: 3, description: 'ID cua user so huu document' })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: 'Bao cao AI4FUTURE',
    description: 'Tieu de document',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Noi dung chi tiet...',
    description: 'Noi dung document',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
