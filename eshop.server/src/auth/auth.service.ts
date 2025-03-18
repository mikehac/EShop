import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { User } from 'src/entities/user.enity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: UserRegisterDto) {
    const existingUser = await this.repo.findOne({
      where: { username: user.username },
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with username ${user.username} already exists`,
      );
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

    const userEntity: User = this.repo.create(user);
    return this.repo.save(userEntity);
  }

  async login(username: string, password: string) {
    const user = await this.repo.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
