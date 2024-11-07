import { Injectable } from '@nestjs/common';
import { MovieActor } from './models';
import { CreateMovieActorDto } from './dto';
import { Actor } from '../actor';

@Injectable()
export class MovieActorService {

  // MovieActor yaratish
  async create(createMovieActorDto: CreateMovieActorDto): Promise<MovieActor> {
    return MovieActor.create(createMovieActorDto);
  }

  // Barcha MovieActor larni olish
  async findAll(): Promise<MovieActor[]> {
    return MovieActor.findAll({include:{model:Actor}});
  }
  async findById(id: string): Promise<MovieActor[]> {
    return MovieActor.findAll({ where: { id } ,include:{model:Actor}});
  }

  // Kino ID bo'yicha aktyorlarni olish
  async findByMovieId(movie_id: number): Promise<MovieActor[]> {
    return MovieActor.findAll({
      where: { movie_id },include:{model:Actor}
    });
  }

  // MovieActorni o'chirish (kino va aktyor orqali)
  async delete(movie_id: number, actor_id: number): Promise<void> {
    await MovieActor.destroy({
      where: { movie_id, actor_id },
    });
  }
}
