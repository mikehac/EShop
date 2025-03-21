import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { RedisModule, RedisService } from 'redissolution';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [RedisModule, AuthModule, DatabaseModule, ProductModule, ProductCategoryModule],
  controllers: [AppController, CartController],
  providers: [AppService, RedisService, CartService],
})
export class AppModule {}
