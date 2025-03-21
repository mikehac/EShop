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
    return await this.repo.find();
  }

  async getById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
}
