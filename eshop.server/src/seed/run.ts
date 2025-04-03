import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source'; // or your TypeORM config
import { seedProducts } from './product.seed';
import { seedCategories } from './category.seed';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await seedCategories(dataSource);
    await seedProducts(dataSource);
    await dataSource.destroy();
  })
  .catch((err) => {
    console.error('❌ Error seeding data:', err);
  });
