import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user.register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    try {
      return await this.authService.register(user);
    } catch (error) {
      return {
        statusCode: error.response.statusCode,
        message: error.response.message,
      };
    }
  }
}
