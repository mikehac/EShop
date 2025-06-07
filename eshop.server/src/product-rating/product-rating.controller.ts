import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { NewRatingDto } from 'src/dtos/new.rating.dto';
import { ProductRatingService } from './product-rating.service';

@Controller('api/product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  @Post()
  async setNewRating(@Body() newRating: NewRatingDto) {
    if (!newRating) {
      throw new BadRequestException(`The new rating wasn't supplied`);
    }
    try {
      await this.productRatingService.setNewRating(newRating);
    } catch (err) {
      console.error(err);
    }
  }

  @Get('/:productId')
  async getRatingByProduct(@Param('productId') productId: number) {
    try {
      const ratings =
        await this.productRatingService.getRatingByProduct(productId);
      if (!ratings) {
        throw new NotFoundError(`No ratings found for product id ${productId}`);
      }
      return ratings;
    } catch (err) {}
  }
}
