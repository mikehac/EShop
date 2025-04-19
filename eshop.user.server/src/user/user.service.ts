import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.enity';
import { Repository, In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    try {
      return this.repo.find();
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in UserService.findAll:', error.message);
      throw new Error('Failed to fetch users');
    }
  }

  findOne(id: string) {
    try {
      return this.repo.findBy({ id });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in UserService.findOne:', error.message);
      throw new Error('Failed to fetch user');
    }
  }

  async findByIds(ids: string[]): Promise<Partial<User>[]> {
    try {
      const users = await this.repo.find({
        where: { id: In(ids) },
      });
      return users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in UserService.findByIds:', error.message);
      throw new Error('Failed to fetch users');
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
