import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { Document } from './documents.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Tao document moi, gan userId cho document' })
  @ApiResponse({ status: 201, type: Document })
  create(@Body() dto: CreateDocumentDto): Document {
    return this.documentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lay danh sach documents, co the loc theo userId' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Loc documents cua mot user cu the',
  })
  @ApiResponse({ status: 200, type: Document, isArray: true })
  findAll(
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ): Document[] {
    return this.documentsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lay chi tiet document theo id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Document })
  @ApiResponse({ status: 404, description: 'Khong tim thay document' })
  findOne(@Param('id', ParseIntPipe) id: number): Document {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cap nhat document theo id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Document })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateDocumentDto>,
  ): Document {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoa document theo id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Xoa thanh cong' })
  @ApiResponse({ status: 404, description: 'Khong tim thay document' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.documentsService.remove(id);
  }
}
