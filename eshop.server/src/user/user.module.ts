import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.enity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, Address])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
