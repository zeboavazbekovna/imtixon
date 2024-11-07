import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateSearchHistoryDto {
  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsOptional()
  search_query?: string;

  @IsDate()
  @IsOptional()
  searched_at?: Date;
}
