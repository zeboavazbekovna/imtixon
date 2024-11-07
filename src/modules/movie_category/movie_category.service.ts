import { Injectable } from '@nestjs/common';
import { MovieCategory } from './models';
import { CreateMovieCategoryDto } from './dto';

@Injectable()
export class MovieCategoryService {
  async createMovieCategory(createMovieCategoryDto: CreateMovieCategoryDto): Promise<MovieCategory> {
    const movieCategory = await MovieCategory.create(createMovieCategoryDto);
    return movieCategory;
  }

  async findAll(): Promise<MovieCategory[]> {
    return MovieCategory.findAll();
  }

  async findByMovieId(movieId: number): Promise<MovieCategory[]> {
    return MovieCategory.findAll({ where: { movie_id: movieId } });
  }

  async deleteMovieCategory(movieId: number, categoryId: number): Promise<void> {
    await MovieCategory.destroy({ where: { movie_id: movieId, category_id: categoryId } });
  }
}
