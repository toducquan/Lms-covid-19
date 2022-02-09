import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { GradeService } from 'src/grade/grade.service';
import { TestService } from 'src/test/test.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });
      const result = this.userRepository.save(user);
      return result;
    } catch (error) {}
  }

  async findAll() {
    try {
      const teachers = await this.userRepository.find({
        where: {
          role: 2,
        },
      });
      return teachers;
    } catch (error) {}
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      if (!user) throw new HttpException('not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      if (!user)
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      Object.assign(user, updateUserDto);
      const userUpdate = await this.userRepository.save(user);
      return userUpdate;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllStudentInClass(id: number) {
    try {
      const student = await this.userRepository.find({
        where: {
          classId: id,
        },
      });
      return student;
    } catch (error) {}
  }

  async validate(body: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (!user)
        throw new HttpException(
          'Incorrect email or password',
          HttpStatus.UNAUTHORIZED,
        );
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch)
        throw new HttpException(
          'Incorrect email or password',
          HttpStatus.UNAUTHORIZED,
        );
      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
