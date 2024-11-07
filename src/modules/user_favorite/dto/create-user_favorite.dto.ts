import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserFavoriteDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  movie_id: number;
}
