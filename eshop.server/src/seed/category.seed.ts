import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity'; // adjust path as needed
import { ProductCategory } from 'src/entities/productCategory.entity';

export const seedCategories = async (dataSource: DataSource) => {
  const CategoryRepository = dataSource.getRepository(ProductCategory);
  const categories = [
    'Consumer Electronics',
    'Home Improvement & Lights',
    'Jewelry & Watches',
    'Toys & Games',
    'Fashion & Apparel',
    'Beauty & Health',
    'Automobiles & Motorcycles',
    'Sports & Outdoors',
    'Computers & Office',
    'Home & Kitchen',
  ];

  await CategoryRepository.save(
    categories.map((category, index) => {
      return {
        id: index + 1,
        name: category,
        imageUrl: `https://example.com/${category.replace(/\s+/g, '-').toLowerCase()}.png`,
        // Replace with actual image URLs or logic to fetch them
      };
    }),
  );
};
