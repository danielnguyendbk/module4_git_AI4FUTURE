import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User, description: 'User created' })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User], description: 'List of users' })
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: 'User by id' })
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOne(id);
  }
}
