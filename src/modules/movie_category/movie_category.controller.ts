import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { MovieCategoryService } from './movie_category.service';
import { CreateMovieCategoryDto } from './dto';

@Controller('movie-categories')
export class MovieCategoryController {
  constructor(private readonly movieCategoryService: MovieCategoryService) {}

  @Post()
  async create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.movieCategoryService.createMovieCategory(createMovieCategoryDto);
  }

  @Get()
  async findAll() {
    return this.movieCategoryService.findAll();
  }

  @Get(':movieId')
  async findByMovieId(@Param('movieId') movieId: number) {
    return this.movieCategoryService.findByMovieId(movieId);
  }

  @Delete(':movieId/:categoryId')
  async delete(@Param('movieId') movieId: number, @Param('categoryId') categoryId: number) {
    return this.movieCategoryService.deleteMovieCategory(movieId, categoryId);
  }
}
