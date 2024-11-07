import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
