import { IsNumber, IsOptional } from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  student_id: number;

  @IsNumber()
  test_id: number;

  @IsNumber()
  @IsOptional()
  grade: number;
}
