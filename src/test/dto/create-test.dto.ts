import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  class_id: number;

  @IsString()
  deadline: string;

  @IsNumber()
  factor: number;

  @IsObject()
  @IsOptional()
  question: any;
}
