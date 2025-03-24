import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductService } from 'src/product/product.service';
import { RedisService } from 'redissolution';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Product])],
  controllers: [CartController],
  providers: [CartService, RedisService, ProductService],
})
export class CartModule {}
