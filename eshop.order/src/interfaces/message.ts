import { Address } from 'src/entities/address.entity';
import { OrderItem } from 'src/entities/order-item.entity';

export interface Message {
  userId: string;
  address: Address;
  items: OrderItem[];
  shipping: number;
  subTotal: number;
  total: number;
}
