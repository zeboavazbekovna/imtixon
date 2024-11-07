import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateSearchHistoryDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  search_query: string;

  @IsDate()
  @IsNotEmpty()
  searched_at: Date;
}
