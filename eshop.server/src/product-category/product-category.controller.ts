import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Controller('api/category')
export class ProductCategoryController {
  constructor(private service: ProductCategoryService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getById(id);
  }
}
