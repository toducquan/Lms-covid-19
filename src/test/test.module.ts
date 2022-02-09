import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { Grade } from 'src/grade/entities/grade.entity';
import { GradeModule } from 'src/grade/grade.module';
import { GradeService } from 'src/grade/grade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, User, Grade]),
    UserModule,
    GradeModule,
  ],
  controllers: [TestController],
  providers: [TestService, UserService, GradeService],
})
export class TestModule {}
