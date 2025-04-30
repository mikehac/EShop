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
import { SelectOrderDto } from './dto/select-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';

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
    try {
      // Fetch all orders from the database
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
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error fetching orders:', error.message); // Log the error message
      console.error('Stack trace:', error.stack); // Log the stack trace
      if (error.response?.data) {
        console.error('Error response data:', error.response.data); // Log additional error details if available
      }
    }
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
    try {
      return await this.orderRepo.findOne({
        where: { id },
        relations: ['items'],
      });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in OrderService.findOne:', error.message);
      throw error;
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
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
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in OrderService.update:', error.message);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepo.findOne({ where: { id } });
      if (order) {
        return await this.orderRepo.remove(order);
      }
      throw new Error(`Order with id ${id} not found`);
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in OrderService.remove:', error.message);
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<SelectOrderDto[]> {
    try {
      const order = await this.orderRepo.find({
        where: { userId },
        relations: ['items', 'address'],
      });
      if (!order) {
        throw new Error(`Order with userId ${userId} not found`);
      }
      return order;
    } catch (error) {
      console.error('Error in OrderService.remove:', error.message);
      throw error;
    }
  }

  async findByFilter(filterDto: FilterOrderDto): Promise<SelectOrderDto[]> {
    try {
      // Start building the query
      const queryBuilder = this.orderRepo
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('order.address', 'address');

      // Apply filters conditionally
      if (filterDto.status) {
        queryBuilder.andWhere('order.status = :status', {
          status: filterDto.status,
        });
      }

      if (filterDto.freeText) {
        // Using LIKE operator with explicit cast for UUID
        queryBuilder.andWhere(
          'order.userId LIKE :searchTerm OR CAST(order.id AS TEXT) LIKE :searchTerm',
          {
            searchTerm: `%${filterDto.freeText}%`,
          },
        );
      }
      if (filterDto.userId) {
        queryBuilder.andWhere('order.userId = :userId', {
          userId: filterDto.userId,
        });
      }

      if (filterDto.startDate) {
        queryBuilder.andWhere('order.createdAt >= :startDate', {
          startDate: filterDto.startDate,
        });
      }

      if (filterDto.endDate) {
        queryBuilder.andWhere('order.createdAt <= :endDate', {
          endDate: filterDto.endDate,
        });
      }

      if (filterDto.minTotal) {
        queryBuilder.andWhere('order.total >= :minTotal', {
          minTotal: filterDto.minTotal,
        });
      }

      if (filterDto.maxTotal) {
        queryBuilder.andWhere('order.total <= :maxTotal', {
          maxTotal: filterDto.maxTotal,
        });
      }

      // Execute the query
      const orders = await queryBuilder.getMany();

      // Get unique user IDs from filtered orders
      const userIds = [...new Set(orders.map((order) => order.userId))];

      // Use existing cache methods to get user data
      let cachedUsers = await this.getFromCache(userIds);

      // Find users that are not in cache yet
      const missingUserIds = userIds.filter(
        (id) => !cachedUsers.some((cachedUser) => cachedUser.userId === id),
      );

      // Fetch missing users if needed
      if (missingUserIds.length > 0) {
        try {
          const usersObservable = await firstValueFrom(
            this.httpService.get(
              `${process.env.USER_SERVER_URL}/user/ids/${missingUserIds.join(',')}`,
            ),
          );
          const usersFromDb = usersObservable.data;

          // Set them to cache
          await this.setToCache(usersFromDb);

          // Refresh cached users list
          cachedUsers = await this.getFromCache(userIds);
        } catch (userError) {
          console.error('Error fetching user data:', userError.message);
          // Continue even if user data fetch fails
        }
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
    } catch (error) {
      console.error('Error in OrderService.findByFilter:', error.message);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }
}
