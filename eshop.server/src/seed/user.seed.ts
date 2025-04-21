import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.enity';
import { DataSource } from 'typeorm';

export async function seedUsers(dataSource: DataSource) {
  const UserRepository = dataSource.getRepository(User);

  // User data from CSV file
  const users: User[] = [
    {
      id: '',
      username: 'mikehac@protonmail.com',
      password: 'secret123',
      createdAt: new Date(),
      role: 'user',
      address: new Address(),
    },
  ];
  // Save users to the database
  await UserRepository.save(users);
  console.log('Users seeded successfully!');
}
