import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsNumber()
  hrm_id: number;

  @IsNumber()
  @IsOptional()
  math_id: number;

  @IsOptional()
  @IsNumber()
  english_id: number;

  @IsOptional()
  @IsNumber()
  literature_id: number;
}
