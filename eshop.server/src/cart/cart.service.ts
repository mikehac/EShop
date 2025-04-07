import { Injectable } from '@nestjs/common';
import { RedisService } from 'redissolution';
import { ShoppingCart, ShoppingCartItem } from 'src/dtos/shoppingCart';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async setCart(shoppingCart: ShoppingCart) {
    const existing = await this.getCart(shoppingCart.userId);

    let mergedItems = shoppingCart.items;

    if (existing && existing.items) {
      // Create a map of productId to items from the existing cart
      const existingItemsMap = new Map(
        existing.items.map((item) => [item.productId, item]),
      );

      // Merge items: shoppingCart.items take precedence
      mergedItems = shoppingCart.items.map((item) => {
        existingItemsMap.delete(item.productId); // Remove the item from the map if it exists
        return item; // Use the item from shoppingCart.items
      });

      // Add remaining items from the existing cart
      mergedItems = [
        ...mergedItems,
        ...(Array.from(existingItemsMap.values()) as ShoppingCartItem[]),
      ];
    }

    // Save the merged cart back to Redis
    const redisResult = await this.redisService.set(
      shoppingCart.userId,
      JSON.stringify({ items: mergedItems }),
    );
    return JSON.parse(JSON.stringify({ result: redisResult }));
  }

  async getCart(userId: string): Promise<any> {
    return JSON.parse(await this.redisService.get(userId));
  }
}
