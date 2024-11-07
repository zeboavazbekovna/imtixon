import { IsOptional, IsInt } from 'class-validator';

export class UpdateUserFavoriteDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  movie_id?: number;
}
