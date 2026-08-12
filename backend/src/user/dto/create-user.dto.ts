import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'email phải là một email hợp lệ' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'name phải có ít nhất 2 ký tự' })
  @MaxLength(100, { message: 'name tối đa 100 ký tự' })
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(150)
  age?: number;
}
