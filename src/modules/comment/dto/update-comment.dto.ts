// dtos/UpdateCommentsDTO.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCommentsDTO {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  movie_id?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
