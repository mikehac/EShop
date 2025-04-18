import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLogInDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}
