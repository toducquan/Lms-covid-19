import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    try {
      const house = await this.classRepository.create(createClassDto);
      const result = this.classRepository.save(house);
      return result;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const classes = await this.classRepository.find();
      return classes;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllClassOfTeacher(teacher_id) {
    try {
      const classes = await this.classRepository.find({
        where: [
          {
            hrm_id: teacher_id,
          },
          {
            math_id: teacher_id,
          },
          {
            english_id: teacher_id,
          },
          {
            literature_id: teacher_id,
          },
        ],
      });
      return classes;
    } catch (error) {}
  }

  async findOne(id: number) {
    try {
      const classes = await this.classRepository.findOneOrFail(id);
      if (!classes) throw new HttpException('not found', HttpStatus.NOT_FOUND);
      return classes;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    try {
      const classes = await this.classRepository.findOneOrFail(id);
      if (!classes)
        throw new HttpException('classes Not Found', HttpStatus.NOT_FOUND);
      Object.assign(classes, updateClassDto);
      const classesUpdate = await this.classRepository.save(classes);
      return classesUpdate;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const deletedClass = await this.classRepository.delete(id);
      return deletedClass;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }
}
