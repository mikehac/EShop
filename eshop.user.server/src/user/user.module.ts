import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.enity';
import { Address } from 'src/entities/address.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'nas',
      port: +process.env.DB_PORT || 54132,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'jacui4Nhftk',
      database: process.env.DB_NAME || 'eshop',
      entities: [User, Address],
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra:
        process.env.DB_SSL === 'true'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {},
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
