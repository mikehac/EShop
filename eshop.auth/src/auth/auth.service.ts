import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterDto } from "../dtos/user.register.dto";
import { User } from "../entities/user.enity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@mike_hac/eshop-sharedauth";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService
  ) {}

  async register(user: UserRegisterDto) {
    try {
      const existingUser = await this.repo.findOne({
        where: { username: user.username },
      });
      if (existingUser) {
        throw new BadRequestException(`User with username ${user.username} already exists`);
      }

      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);

      const userEntity: User = this.repo.create(user);
      return this.repo.save(userEntity);
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error("Error in AuthService.register:", error.message);
      throw error;
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.repo.findOne({
        where: { username },
      });
      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const payload = { username: user.username, sub: user.id };

      return {
        token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error("Error in AuthService.login:", error.message);
      throw error;
    }
  }
}
