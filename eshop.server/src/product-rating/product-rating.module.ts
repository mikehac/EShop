import { Module } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRatingController } from './product-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.enity';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { ProductCategory } from 'src/entities/productCategory.entity';
import { ProductRating } from 'src/entities/productRating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      Product,
      ProductCategory,
      ProductCategory,
      ProductRating,
    ]),
  ],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
})
export class ProductRatingModule {}
