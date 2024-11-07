// dto/CreateMovieDto.ts
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString,IsDateString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  release_date: string;

  @IsOptional()
  image?: any;

  @IsOptional()
  video?:any

  @IsNotEmpty()
  duration: string;

  @IsOptional()
  @IsBoolean()
  is_premium?: boolean;

  @IsNotEmpty()
  category_id: string;
}
