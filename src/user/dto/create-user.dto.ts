import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  role: number;

  @IsString()
  dob: string;

  @IsNumber()
  @IsOptional()
  classId: number;
}
