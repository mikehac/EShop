import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/entities/productCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private repo: Repository<ProductCategory>,
  ) {}
  async getAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductCategoryService.getAll:', error.message);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductCategoryService.getById:', error.message);
      throw error;
    }
  }
}
