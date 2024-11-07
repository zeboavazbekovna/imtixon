import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  is_premium?: boolean;
}
