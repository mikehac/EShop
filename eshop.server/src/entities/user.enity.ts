import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { ProductRating } from './productRating.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column()
  role: string = 'user';

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @ManyToMany(() => ProductRating, (productRating) => productRating.user)
  productRating?: ProductRating[];
}
