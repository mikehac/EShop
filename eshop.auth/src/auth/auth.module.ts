import { JwtStrategy, PassportModule, SharedModule } from "@mike_hac/eshop-sharedauth";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { Address } from "src/entities/address.entity";
import { User } from "src/entities/user.enity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [SharedModule, DatabaseModule, TypeOrmModule.forFeature([User, Address]), PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
