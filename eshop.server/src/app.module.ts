import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartController } from './cart/cart.controller';
import { RedisModule, RedisService } from 'redissolution';
import { CartService } from './cart/cart.service';

@Module({
  imports: [RedisModule],
  controllers: [AppController, CartController],
  providers: [AppService, RedisService, CartService],
})
export class AppModule {}
