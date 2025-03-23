import { Injectable } from '@nestjs/common';
import { RedisService } from 'redissolution';
import { ShoppingCard, ShoppingCardItem } from 'src/dtos/shoppingCard';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async setCart(shoppingCard: ShoppingCard) {
    const existing = await this.getCart(shoppingCard.userId);

    let mergedItems = shoppingCard.items;

    if (existing && existing.items) {
      // Create a map of productId to items from the existing cart
      const existingItemsMap = new Map(
        existing.items.map((item) => [item.productId, item]),
      );

      // Merge items: shoppingCard.items take precedence
      mergedItems = shoppingCard.items.map((item) => {
        existingItemsMap.delete(item.productId); // Remove the item from the map if it exists
        return item; // Use the item from shoppingCard.items
      });

      // Add remaining items from the existing cart
      mergedItems = [
        ...mergedItems,
        ...(Array.from(existingItemsMap.values()) as ShoppingCardItem[]),
      ];
    }

    // Save the merged cart back to Redis
    return this.redisService.set(
      shoppingCard.userId,
      JSON.stringify({ items: mergedItems }),
    );
  }
  async getCart(userId: string): Promise<any> {
    return JSON.parse(await this.redisService.get(userId));
  }
}
