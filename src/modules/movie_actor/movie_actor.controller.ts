import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { MovieActorService } from './movie_actor.service';
import { CreateMovieActorDto } from './dto';

@Controller('movie-actors')
export class MovieActorController {
  constructor(private readonly movieActorService: MovieActorService) {}

  // Create a new MovieActor
  @Post()
  async create(@Body() createMovieActorDto: CreateMovieActorDto) {
    return this.movieActorService.create(createMovieActorDto);
  }

  // Get all MovieActor associations
  @Get()
  async findAll() {
    return this.movieActorService.findAll();
  }

  // Get MovieActor by Movie ID
  @Get(':movieId')
  async findByMovieId(@Param('movieId') movieId: number) {
    return this.movieActorService.findByMovieId(movieId);
  }

  // Delete MovieActor by Movie ID and Actor ID
  @Delete(':movieId/:actorId')
  async delete(@Param('movieId') movieId: number, @Param('actorId') actorId: number) {
    return this.movieActorService.delete(movieId, actorId);
  }
}
