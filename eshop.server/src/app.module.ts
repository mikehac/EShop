import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { CartController } from './cart/cart.controller';
import { RedisModule, RedisService } from 'redissolution';
import { CartService } from './cart/cart.service';
import { User } from './entities/user.enity';
import { Address } from './entities/address.entity';

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
    }),
    RedisModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService, RedisService, CartService],
})
export class AppModule {}
