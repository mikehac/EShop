import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, (order) => order.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' }) // Foreign key column
  order: Order;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zip: string;

  @Column()
  country: string;
}
