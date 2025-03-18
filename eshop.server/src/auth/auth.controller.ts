import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { UserLogInDto } from 'src/dtos/user.login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    return await this.authService.register(user);
  }
  @Post('login')
  async login(@Body() user: UserLogInDto) {
    const currentUser = await this.authService.login(
      user.username,
      user.password,
    );
    return currentUser;
  }
}
