// controllers/MovieController.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  UseInterceptors,
  UploadedFiles,
  InternalServerErrorException,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './models';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Protected } from 'src/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { CategoryService } from '../category';
import { CreateCommentsDTO } from '../comment';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly categoryService: CategoryService,
  ) {}

  @Protected(true)
  @Get('/api/movies')
  async getMoviesApi() {
    try {
      return await this.movieService.findAll();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new InternalServerErrorException('Error fetching movies');
    }
  }

  @Protected(true)
  @Get()
  async getMovies() {
    const movies = await this.movieService.findAll();
    const categories = await this.categoryService.findAllCategories();
    return { movies, categories };
  }

  @ApiBearerAuth()
  @Post('/add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async createMovie(
    @Body() payload: CreateMovieDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    const image = files.find(file => file.mimetype.startsWith('image/'));
    const video = files.find(file => file.mimetype.startsWith('video/'));

    try {
      await this.movieService.create({ ...payload, image, video });
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new InternalServerErrorException('Error creating movie');
    }
  }

  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('/add/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(
    @Body() payload: UpdateMovieDto,
    @UploadedFiles() image: Express.Multer.File,
  ): Promise<void> {
    try {
      await this.movieService.uploadMovieImage({ ...payload, image });
    } catch (error) {
      console.error('Error uploading movie image:', error);
      throw new InternalServerErrorException('Error uploading movie image');
    }
  }

  @Protected(true)
  @Get(':id') // This part was already correct
  @Render('movie.ejs')
  async getMovieDetails(@Param('id', ParseIntPipe) id: number) {
    try {
      const movie = await this.movieService.findOne(id);
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }
      return { movie };  // Pass the movie object to the view
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new InternalServerErrorException('Error fetching movie details');
    }
  }

  // The following is corrected
  @Get('all')
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  // Corrected the route to use ':id' properly
  @Get('/movie/:id') // Correct path should be '/movie/:id'
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.movieService.findOne(id);
  }
  @Get('/:id') // Correct path should be '/movie/:id'
  async findOnee(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Delete(':movieId')
  @ApiOperation({ summary: 'Movieni o\'chirish' })
  async deleteMovie(@Param('movieId', ParseIntPipe) movieId: number): Promise<void> {
    await this.movieService.remove(movieId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Post('/comments/:movieId/comments')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentsDTO,
  ): Promise<void> {
    try {
      await this.movieService.addComment({ ...createCommentDto, movie_id: id });
    } catch (error) {
      console.error('Error adding comment:', error);
      throw new InternalServerErrorException('Error adding comment');
    }
  }
}
