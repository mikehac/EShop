import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async getAllProducts() {
    try {
      return await this.repo.find();
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductService.getAllProducts:', error.message);
      throw error;
    }
  }

  async getByCategoryId(categoryId: number) {
    try {
      return await this.repo.find({
        where: { categoryId },
        relations: ['category'],
      });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductService.getByCategoryId:', error.message);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      return await this.repo.findOne({
        where: { id },
        relations: ['category'],
      });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductService.getById:', error.message);
      throw error;
    }
  }

  async getByIds(ids: number[]) {
    try {
      return await this.repo.find({ where: { id: In(ids) } });
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductService.getByIds:', error.message);
      throw error;
    }
  }

  search(searchTerm: string) {
    try {
      return this.repo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .where('LOWER(product.name) LIKE :searchTerm', {
          searchTerm: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(product.description) LIKE :searchTerm', {
          searchTerm: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(category.name) LIKE :searchTerm', {
          searchTerm: `%${searchTerm.toLowerCase()}%`,
        })
        .getMany();
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Error in ProductService.search:', error.message);
      throw error;
    }
  }
}
