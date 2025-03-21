import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { seedProducts } from './seed/product.seed';
import { Product } from './entities/product.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'nas',
  port: +process.env.DB_PORT || 54132,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'jacui4Nhftk',
  database: process.env.DB_NAME || 'eshop',
  entities: [ProductCategory, Product],
  migrations: ['src/migrations/*.ts'], // Ensures migration files are recognized
  synchronize: false, // Keep false in production
  logging: false, // Keep false in production
});

if (require.main === module) {
  AppDataSource.initialize()
    .then(async (dataSource: DataSource) => {
      await seedProducts(dataSource);
      console.log('Data Source initialized');
    })
    .catch((err) =>
      console.error('Error during Data Source initialization', err),
    );
}
