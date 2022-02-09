import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(payload: LoginDto) {
    const user = await this.userService.validate(payload);
    return {
      access_token: this.jwtService.sign({ ...user }),
    };
  }
}
