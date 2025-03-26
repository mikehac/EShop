import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.enity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}
  async getById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['address'], // Load the related address entity
      });

      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async updateUserAddress(
    userId: string,
    addressData: Partial<Address>,
  ): Promise<Address> {
    try {
      // Find the user's address
      const existingAddress = await this.addressRepo.findOne({
        where: { userId },
      });

      if (!existingAddress) {
        throw new Error(`Address for user with ID ${userId} not found`);
      }

      // Update the address with the new data
      const updatedAddress = this.addressRepo.merge(
        existingAddress,
        addressData,
      );

      // Save the updated address
      return await this.addressRepo.save(updatedAddress);
    } catch (error) {
      console.error('Error updating user address:', error);
      throw error;
    }
  }
}
