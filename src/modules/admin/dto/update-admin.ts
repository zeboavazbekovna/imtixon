import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateAdminDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    password?: string;
  
    @IsOptional()
    @IsNumber()
    balance?: number;
  
    @IsOptional()
    is_premium?: boolean;
  }
  