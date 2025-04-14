import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCart } from 'src/dtos/shoppingCart';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '@mikehac/eshop-sharedauth';
import { ProductService } from 'src/product/product.service';

@Controller('api/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  @Post()
  async setCart(@Body() shoppingCart: ShoppingCart): Promise<any> {
    return await this.cartService.setCart(shoppingCart);
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
