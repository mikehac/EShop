import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { NewRatingDto } from 'src/dtos/new.rating.dto';

@Controller('api/product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  @Post()
  setNewRating(@Body() newRating: NewRatingDto) {
    if (!newRating) {
      throw new BadRequestException(`The new rating wasn't supplied`);
    }
    try {
      this.productRatingService.setNewRating(newRating);
    } catch (err) {
      console.error(err);
    }
  }
}
