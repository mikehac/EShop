import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { ProductCategory } from 'src/entities/productCategory.entity';
import { ProductRating } from 'src/entities/productRating.entity';
import { Rating } from 'src/entities/rating.entity';
import { User } from 'src/entities/user.enity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      ProductCategory,
      Product,
      Rating,
      ProductRating,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'nas',
      port: +process.env.DB_PORT || 54132,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'jacui4Nhftk',
      database: process.env.DB_NAME || 'eshop',
      entities: [
        User,
        Address,
        ProductCategory,
        Product,
        Rating,
        ProductRating,
      ],
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
})
export class DatabaseModule {}
