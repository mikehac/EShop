import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCard } from 'src/dtos/shoppingCard';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/Guards/JwtAuthGuard';
import { ProductService } from 'src/product/product.service';

@Controller('api/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  @Post()
  async setCart(@Body() shoppingCard: ShoppingCard): Promise<any> {
    return await this.cartService.setCart(shoppingCard);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string): Promise<any> {
    const redisResult = await this.cartService.getCart(userId);
    if (!redisResult) {
      throw new NotFoundException(
        `The user with id ${userId} doesn't have a cart items`,
      );
    }
    const productIds = redisResult.items?.map((item) => item.productId);
    const productInCart = await this.productService.getByIds(productIds);
    const result = redisResult.items.map((prod) => ({
      id: prod.productId,
      name: productInCart.find((x) => x.id == prod.productId).name,
      quantity: prod.quantity,
      price: productInCart.find((x) => x.id == prod.productId).price,
      totalPrice:
        prod.quantity * productInCart.find((x) => x.id == prod.productId).price,
    }));
    return (
      result ??
      new NotFoundException(`The user with id ${userId} doesn't have a cart`)
    );
  }
}
