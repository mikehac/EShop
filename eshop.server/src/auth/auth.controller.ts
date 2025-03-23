import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { UserLogInDto } from 'src/dtos/user.login.dto';
import { JwtAuthGuard } from 'src/Guards/JwtAuthGuard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: UserLogInDto, @Res() res: Response) {
    const loginResult = await this.authService.login(
      user.username,
      user.password,
    );
    // When sameSite is set to 'none', secure must be set to true
    // When sameSite is set to 'lax', secure can be set to false
    res.cookie('jwt', loginResult.access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true, // process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ message: 'Login successful', status: 200 });
  }

  @Post('logout')
  logout(@Res() res) {
    res.cookie('jwt', '', { expires: new Date(0) });
    return res.send({ success: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req) {
    return { message: 'Authenticated', user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return { id: req.user.userId, username: req.user.username };
  }
}
