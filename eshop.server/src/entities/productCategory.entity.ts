import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

//TODO: This entity is temprorary, it will be moved to another web api
@Entity('productCategories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  imageUrl: string;
  // @OneToMany(() => Product, (product) => product.category)
  // products: Product[];
}
