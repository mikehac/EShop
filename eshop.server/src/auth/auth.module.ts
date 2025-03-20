import { Module } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.enity';
import { JwtStrategy } from 'src/Guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Address]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
