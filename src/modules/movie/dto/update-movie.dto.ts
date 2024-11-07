// dto/UpdateMovieDto.ts
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  release_date?: string;

  @IsOptional()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  is_premium?: boolean;

  @IsString()
  category_id?: string;
}
