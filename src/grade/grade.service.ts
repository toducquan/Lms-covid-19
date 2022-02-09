import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
  ) {}
  create(createGradeDto) {
    try {
      const grade = this.gradeRepository.create(createGradeDto);
      const result = this.gradeRepository.save(grade);
    } catch (error) {}
  }

  findAll() {
    return `This action returns all grade`;
  }

  async findAllGradeWithTestId(id: number) {
    try {
      const grades = this.gradeRepository.find({
        where: {
          test_id: id,
        },
      });
      return grades;
    } catch (error) {}
  }

  async getAllGradeWithStudentId(id: number) {
    try {
      const grades = this.gradeRepository.find({
        where: {
          student_id: id,
        },
      });
      return grades;
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  async updatePointWithTestIdAndStudentId(test_id, student_id, newGrade) {
    try {
      const oldGrade = await this.gradeRepository.findOne({
        where: {
          student_id: student_id,
          test_id: test_id,
        },
      });
      oldGrade.grade = newGrade;
      await this.gradeRepository.save(oldGrade);
    } catch (error) {}
  }

  async update(id: number, updateGradeDto) {
    try {
      const grade = await this.gradeRepository.findOneOrFail(id);
      Object.assign(grade, updateGradeDto);
      const newGrade = await this.gradeRepository.save(grade);
      return newGrade;
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
