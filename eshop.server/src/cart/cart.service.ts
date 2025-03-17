import { Injectable } from '@nestjs/common';
import { RedisService } from 'redissolution';
import { ShoppingCard } from 'src/dtos/shoppingCard';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  setCart(shoppingCard: ShoppingCard) {
    return this.redisService.set(
      shoppingCard.userId,
      JSON.stringify(shoppingCard.items),
    );
  }
  async getCart(userId: string): Promise<any> {
    return JSON.parse(await this.redisService.get(userId));
  }
}
