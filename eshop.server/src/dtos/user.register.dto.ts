import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}
