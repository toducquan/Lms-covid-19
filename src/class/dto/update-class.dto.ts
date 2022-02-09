import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @IsString()
  name: string;

  @IsNumber()
  hrm_id: number;

  @IsNumber()
  math_id: number;

  @IsNumber()
  english_id: number;

  @IsNumber()
  literature_id: number;
}
