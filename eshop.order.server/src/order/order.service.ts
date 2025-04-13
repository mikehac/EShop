import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Address } from './entities/address.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    return await this.orderRepo.find({
      relations: ['items'],
    });
  }

  async findOne(id: string) {
    return await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    const newOrder: Order = {
      id,
      userId: order.userId,
      shipping: updateOrderDto.shipping ?? order.shipping,
      subtotal: updateOrderDto.subtotal ?? order.subtotal,
      total: updateOrderDto.total ?? order.total,
      status: updateOrderDto.status ?? order.status,
      createdAt: order.createdAt,
      updatedAt: new Date(),
      items: order.items,
      address: order.address,
      statusHistory: order.statusHistory,
    };
    return await this.orderRepo.update(id, newOrder);
  }

  async remove(id: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (order) {
      return await this.orderRepo.remove(order);
    }
    throw new Error(`Order with id ${id} not found`);
  }
}
