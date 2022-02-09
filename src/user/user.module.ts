import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Test } from 'src/test/entities/test.entity';
import { Grade } from 'src/grade/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Test, Grade])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
