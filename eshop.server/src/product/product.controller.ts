import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    if (searchTerm) {
      return await this.productService.search(searchTerm);
    }
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getById(id);
  }
  @Get('category/:id')
  async getByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getByCategoryId(id);
  }
}
