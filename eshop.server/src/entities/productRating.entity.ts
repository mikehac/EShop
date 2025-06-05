import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rating } from './rating.entity';
import { User } from './user.enity';

@Entity('productRating')
export class ProductRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  ratingId: number;

  @Column()
  userId: string;

  @Column()
  ratingDescription: string;

  @Column()
  createdAt: Date;

  @OneToOne(() => Rating, (rating) => rating.id)
  rating: Rating;

  @ManyToMany(() => User, (user) => user.productRating)
  users?: User[];
}
