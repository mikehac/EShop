import { Rating } from '../entities/rating.entity';
import { DataSource } from 'typeorm';

export const seedRating = async (dataSource: DataSource) => {
  const ratingRepository = dataSource.getRepository(Rating);

  const ratings: Rating[] = [
    { id: 1, name: 'Excellent', value: 5 },
    { id: 2, name: 'Good', value: 4 },
    { id: 3, name: 'Average', value: 3 },
    { id: 4, name: 'Poor', value: 2 },
    { id: 5, name: 'Terrible', value: 1 },
  ];

  await ratingRepository.save(ratings);
  console.log(`✅ Seeded ${ratings.length} ratings.`);
};
