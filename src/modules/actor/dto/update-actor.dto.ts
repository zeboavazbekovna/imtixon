import { Actor } from '../interfaces/actor.interface';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActorDto implements Actor {
    id: number;
  
    @IsString()
    name?: string;
  
    @IsString()
    bio?: string;
  
    @IsString()
    birth_date?: string;
  }