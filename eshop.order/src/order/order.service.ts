import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { Message } from 'src/interfaces/message';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async SaveNewOrder(message: Message) {
    // console.log(message);
    const order: Order = {
      userId: message.userId,
      shipping: message.shipping,
      id: uuidv4(),
      subtotal: message.subTotal,
      total: message.total,
      status: '',
      createdAt: new Date(),
      updatedAt: undefined,
      items: undefined,
      address: undefined,
      statusHistory: [],
    };
    await this.orderRepo.save(order);
  }
}
