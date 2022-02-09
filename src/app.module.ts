import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import DbConfig from './config/database';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { TestModule } from './test/test.module';
import { GradeModule } from './grade/grade.module';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(DbConfig), ClassModule, TestModule, GradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
