import { Injectable } from '@nestjs/common';
import { RedisService } from 'redissolution';
import { ShoppingCart, ShoppingCartItem } from 'src/dtos/shoppingCart';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async setCart(shoppingCart: ShoppingCart) {
    try {
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
      const currentCart = JSON.parse(
        await this.redisService.get(shoppingCart.userId),
      );
      const currentCartItemsCount = currentCart?.items?.length;
      return JSON.parse(
        JSON.stringify({
          result: redisResult,
          totalItems: currentCartItemsCount,
        }),
      );
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in CartService.setCart:', error.message);
      throw error;
    }
  }

  async getCart(userId: string): Promise<any> {
    try {
      return JSON.parse(await this.redisService.get(userId));
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in CartService.getCart:', error.message);
      throw error;
    }
  }
}
