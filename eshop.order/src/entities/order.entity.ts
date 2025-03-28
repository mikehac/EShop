import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatusHistory } from './order-status-history.entity';
import { Address } from './address.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal')
  shipping: number;

  @Column('decimal')
  subtotal: number;

  @Column('decimal')
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @OneToOne(() => Address, (address) => address.order, {
    cascade: true,
    eager: true,
  })
  @OneToOne(() => Address, (address) => address.order, { cascade: true })
  address: Address;

  @OneToMany(() => OrderStatusHistory, (history) => history.order, {
    cascade: true,
  })
  statusHistory: OrderStatusHistory[];
}
