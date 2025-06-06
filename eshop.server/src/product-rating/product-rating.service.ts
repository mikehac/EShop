import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewRatingDto } from 'src/dtos/new.rating.dto';
import { RatingResponseDto } from 'src/dtos/rating.response.dto';
import { Product } from 'src/entities/product.entity';
import { ProductRating } from 'src/entities/productRating.entity';
import { User } from 'src/entities/user.enity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductRatingService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(ProductRating)
    private prodRatingRepo: Repository<ProductRating>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async setNewRating(newRatingDto: NewRatingDto) {
    if (!newRatingDto) return;

    await this.prodRatingRepo.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const user = await this.userRepo.findOne({
            where: { id: newRatingDto.userId },
          });

          if (!user) throw new Error('User not found');

          const product = await this.productRepo.findOne({
            where: { id: newRatingDto.productId },
          });

          if (!product) throw new Error('Product not found');
          const rating = new ProductRating();
          rating.userId = newRatingDto.userId;
          rating.productId = newRatingDto.productId;
          rating.ratingId = newRatingDto.ratingId;
          rating.ratingDescription = newRatingDto.ratingDescription;
          rating.createdAt = new Date();

          await transactionalEntityManager.save(rating);
        } catch (error) {
          console.error('Transaction failed:', error.message);
          throw error; // Ensure rollback happens
        }
      },
    );
  }
  async getRatingByProduct(productId: number): Promise<RatingResponseDto[]> {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      return null;
    }
    try {
      console.log('Repository initialized:', this.prodRatingRepo);
      // Use eager loading with proper relation configuration
      const productRatings = await this.prodRatingRepo.find({
        relations: {
          rating: true,
          user: true,
        },
        where: { productId: productId },
      });

      const ratingsResult = productRatings.map((pr) => {
        const result = new RatingResponseDto();
        result.productId = Number(pr.productId);
        result.ratingId = pr.ratingId;
        result.ratingName = pr.rating?.name;
        result.ratingValue = pr.rating?.value;
        result.ratingDescription = pr.ratingDescription;
        result.userName = pr.user?.username;
        return result;
      });

      return ratingsResult;
    } catch (error) {
      console.error('Error fetching product ratings:', error.message);
      console.error('Repository state:', this.prodRatingRepo);
      throw error; // Rethrow error for further debugging
    }
  }
}
