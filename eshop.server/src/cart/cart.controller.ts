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

@Controller('api/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async setCart(@Body() shoppingCard: ShoppingCard) {
    return this.cartService.setCart(shoppingCard);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string): Promise<any> {
    const result = await this.cartService.getCart(userId);
    return (
      result ??
      new NotFoundException(`The user with id ${userId} doesn't have a cart`)
    );
  }
}
