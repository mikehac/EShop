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
import { UserModule } from './user/user.module';
import { SharedModule } from '@mike_hac/eshop-sharedauth';
import { ProductRatingModule } from './product-rating/product-rating.module';
@Module({
  imports: [
    RedisModule,
    SharedModule,
    // AuthModule,
    DatabaseModule,
    ProductModule,
    ProductCategoryModule,
    CartModule,
    MqmanagerModule,
    UserModule,
    ProductRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
