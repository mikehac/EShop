import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Address } from 'src/entities/address.entity';
import { JwtAuthGuard } from '@mikehac/eshop-sharedauth';

@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      return new NotFoundException(`Ths user with id=${id} wasn't found`);
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() address: Partial<Address>) {
    return await this.userService.updateUserAddress(id, address);
  }
}
