import { ProductCategory } from './productCategory.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  imageUrl: string;
  @Column({ type: 'float' })
  price: number;
  @Column()
  categoryId: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;
}
