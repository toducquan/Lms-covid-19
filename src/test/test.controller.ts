import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/config/role';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Auth(Role.MANAGER)
  create(@Body() createTestDto: CreateTestDto, @Request() req) {
    return this.testService.create(createTestDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.testService.findAll(req.user.id);
  }

  @Get('/student-test')
  @UseGuards(JwtAuthGuard)
  getAllTestOfStudent(@Request() req) {
    return this.testService.getAllTestOfStudent(req.user.id);
  }

  @Post('/student-test/:id')
  @UseGuards(JwtAuthGuard)
  doExam(@Param('id') id: string, @Body() answerDto: any, @Request() req) {
    return this.testService.doExam(+id, answerDto.answer, req.user.id);
  }

  @Get('/class/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Auth(Role.MANAGER)
  getListTotalMarkForClass(@Param('id') id: string) {
    return this.testService.getListTotalMarkForClass(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
