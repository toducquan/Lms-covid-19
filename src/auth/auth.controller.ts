import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Role } from 'src/config/role';
import { AuthService } from './auth.service';
import { Auth } from './decorator/auth.decorator';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getUserInfor(@Request() req) {
    return req.user;
  }
}
