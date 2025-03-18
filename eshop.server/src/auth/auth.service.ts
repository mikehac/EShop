import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { User } from 'src/entities/user.enity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
}
