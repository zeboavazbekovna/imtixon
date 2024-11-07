// dtos/CreateCommentsDTO.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCommentsDTO {
  @IsInt()
  user_id: number;

  @IsInt()
  movie_id: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
