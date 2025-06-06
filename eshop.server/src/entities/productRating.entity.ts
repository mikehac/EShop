import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column('uuid')
  userId: string;

  @Column()
  ratingDescription: string;

  @Column()
  createdAt: Date;
  @ManyToOne(() => Rating)
  @JoinColumn({ name: 'ratingId' })
  rating: Rating;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
