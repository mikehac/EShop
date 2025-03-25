import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { RedisModule, RedisService } from 'redissolution';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { MqmanagerModule } from './mqmanager/mqmanager.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    DatabaseModule,
    ProductModule,
    ProductCategoryModule,
    CartModule,
    MqmanagerModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
