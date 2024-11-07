import { Actor } from '../interfaces/actor.interface';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActorDto implements Actor {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  birth_date?: string;
}
