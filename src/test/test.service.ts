import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeService } from 'src/grade/grade.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private testRepository: Repository<Test>,
    private userService: UserService,
    private gradeService: GradeService,
  ) {}
  async create(createTestDto: CreateTestDto, user_id) {
    try {
      const { class_id, ...exam } = createTestDto;
      const test = this.testRepository.create({ ...exam, user_id: user_id });
      const result: any = await this.testRepository.save(test);
      const studentInClass = await this.userService.getAllStudentInClass(
        class_id,
      );
      await Promise.all(
        studentInClass.map(async (item: any) => {
          await this.gradeService.create({
            student_id: item.id,
            test_id: result.id,
          });
        }),
      );
      return result;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getAllTestOfStudent(student_id) {
    try {
      const grades = await this.gradeService.getAllGradeWithStudentId(
        student_id,
      );
      const studentTest = await Promise.all(
        grades.map(async (item) => {
          const test = await this.testRepository.findOneOrFail(item.test_id);
          return {
            ...test,
            grade: item.grade,
          };
        }),
      );
      return studentTest;
    } catch (error) {}
  }

  async findAll(id) {
    try {
      const tests = await this.testRepository.find({
        where: {
          user_id: id,
        },
      });
      return tests;
    } catch (error) {}
  }

  async getFactorWithTestId(id) {
    try {
      const test: any = await this.testRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
      return test.factor;
    } catch (error) {}
  }

  countTotalPointForAStudent(listPoint: any) {
    const totalPoint = listPoint.reduce((total, currentValue) => {
      return total + currentValue.grade * currentValue.factor;
    }, 0);
    const totalFactor = listPoint.reduce((total, currentValue) => {
      return total + currentValue.factor;
    }, 0);
    return totalPoint / totalFactor;
  }

  async getListTotalMarkForClass(classId: number) {
    try {
      const students = await this.userService.getAllStudentInClass(classId);
      const listTotalPoint = await Promise.all(
        students.map(async (item: any) => {
          const listGrade = await this.gradeService.getAllGradeWithStudentId(
            item.id,
          );
          const listPoint = await Promise.all(
            listGrade.map(async (gradeItem: any) => {
              const factor = await this.getFactorWithTestId(gradeItem.test_id);
              return {
                factor: factor,
                grade: gradeItem.grade,
              };
            }),
          );
          const totalPointForAStudent =
            this.countTotalPointForAStudent(listPoint);
          return {
            ...item,
            total: totalPointForAStudent,
          };
        }),
      );
      return listTotalPoint;
    } catch (error) {}
  }

  async doExam(test_id: number, answer: any, student_id) {
    try {
      const tests: any = await this.testRepository.findOneOrFail(test_id);
      const correctAns = tests.question.correct_ans;
      let point = 0;
      for (let i = 0; i < correctAns.length; i++) {
        if (correctAns[i] == answer[i]) point = point + 1;
      }
      console.log('vaooo ', test_id, point, answer);
      await this.gradeService.updatePointWithTestIdAndStudentId(
        test_id,
        student_id,
        (point * 10) / correctAns.length,
      );
    } catch (error) {}
  }

  async findOne(id: number) {
    try {
      const grade = await this.gradeService.findAllGradeWithTestId(id);
      const gradeWithStudentName = await Promise.all(
        grade.map(async (item) => {
          const user = await this.userService.findOne(item.student_id);
          return {
            ...item,
            student_name: user.name,
          };
        }),
      );
      return gradeWithStudentName;
    } catch (error) {}
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
