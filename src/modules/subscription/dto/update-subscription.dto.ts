import { IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;
}
