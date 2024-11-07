// dto/create-movie-actor.dto.ts
import { MovieActorInterface } from '../interfaces';


export class CreateMovieActorDto implements MovieActorInterface {
  movie_id: number;
  actor_id: number;
}
