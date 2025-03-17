import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.enity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  zip: string;
  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: string;
}
