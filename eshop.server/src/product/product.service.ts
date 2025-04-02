import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async getAllProducts() {
    return await this.repo.find();
  }

  async getByCategoryId(categoryId: number) {
    return await this.repo.find({ where: { categoryId } });
  }

  async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async getByIds(ids: number[]) {
    return await this.repo.find({ where: { id: In(ids) } });
  }
}
