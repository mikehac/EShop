import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: string;
}
