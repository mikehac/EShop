import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { Message } from 'src/interfaces/message';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    private readonly dataSource: DataSource,
  ) {}

  async SaveNewOrder(message: Message) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const address: Address = queryRunner.manager.create(
        Address,
        message.address,
      );
      await queryRunner.manager.save(Address, address);
      // Create the order
      const order: Order = {
        id: uuidv4(),
        userId: message.userId,
        shipping: message.shipping,
        subtotal: message.subTotal,
        total: message.total,
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        address: address,
        items: undefined,
        statusHistory: [],
      };
      await queryRunner.manager.save(Order, order);

      // Save the order items
      const items: OrderItem[] = message.items.map((item) => ({
        id: uuidv4(),
        productId: item.id,
        order: order, // Associate the order
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
      await queryRunner.manager.save(OrderItem, items);

      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      await queryRunner.rollbackTransaction();
      console.error('Error saving new order:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
