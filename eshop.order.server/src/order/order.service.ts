import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Address } from './entities/address.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RedisService } from 'redissolution';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    private readonly httpService: HttpService,
    private redisService: RedisService,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    const orders = await this.orderRepo.find({
      relations: ['items', 'address'],
    });

    const userIds = [...new Set(orders.map((order) => order.userId))];
    // get users from cache(Redis)
    let cachedUsers = await this.getFromCache(userIds);
    // find users that are not in cache yet
    const missingUserIds = userIds.filter(
      (id) => !cachedUsers.some((cachedUser) => cachedUser.userId === id),
    );

    if (missingUserIds.length > 0) {
      // get users which are not in cache from user server
      const usersObservable = await firstValueFrom(
        this.httpService.get(
          `${process.env.USER_SERVER_URL}/user/ids/${missingUserIds.join(',')}`,
        ),
      );
      const usersFromDb = usersObservable.data;

      // Set them to cache
      await this.setToCache(usersFromDb);
      cachedUsers = await this.getFromCache(userIds);
    }

    // Map orders with user data
    return orders.map((order) => {
      const user = cachedUsers.find((user) => user.userId === order.userId);
      if (user) {
        return {
          ...order,
          user: {
            id: user.userId,
            username: user.user.username,
          },
        };
      }
      return {
        ...order,
        user: {
          id: order.userId,
          username: 'not found',
        },
      };
    });
  }

  private async getFromCache(userIds: string[]) {
    const usersFromCache = await Promise.all(
      userIds.map(async (userId) => {
        const user = await this.redisService.get(`user_${userId}`);
        if (user) return { userId, user: JSON.parse(user) };
        return null;
      }),
    );

    return usersFromCache.filter((user) => user !== null);
  }

  private async setToCache(users: any[]) {
    users.map(async (user) => {
      await this.redisService.set(`user_${user.id}`, JSON.stringify(user));
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
