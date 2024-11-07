// services/MovieService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models';
import { CreateMovieDto } from './dto';
import { UpdateMovieDto } from './dto';
import { UploadFileResponse, UploadService } from '../upload';
import { UploadMovieImageRequest } from './interfaces/upload-movie.interface';
import { NotFoundException } from '@nestjs/common';
import { Category } from '../category';
import { MovieActor } from '../movie_actor';
import { Actor } from '../actor';
import { Comments, CreateCommentsDTO } from '../comment';
import { User } from '../user';


@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: typeof Movie,
    private readonly uploadService: UploadService,
  ) {}

  async create(payload: CreateMovieDto): Promise<Movie> {
    let imageUrl: UploadFileResponse | null = null;
    let videoUrl: UploadFileResponse | null = null;

    // Rasm va videoni yuklash
    if (payload.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads', // Faqat 'uploads' papkasi
        file: payload.image,
      });
    }
    if (payload.video) {
      videoUrl = await this.uploadService.uploadFile({
        destination: 'uploads', // Faqat 'uploads' papkasi
        file: payload.video,
      });
    }

    const movie = await this.movieModel.create({
      title: payload.title,
      description: payload.description,
      image: imageUrl?.imageUrl || null, // Rasm URL
      video: videoUrl?.imageUrl || null, // Video URL
      release_date: payload.release_date,
      duration: payload.duration,
      is_premium: payload.is_premium || false,
      comments: [],
      movieActors: [],
      category_id: payload.category_id,
    });

    return movie; // Yaratilgan ovqatni qaytarish
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll({
      include: [{ model: Category},{model:MovieActor}], 
    });
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieModel.findOne({
      where: { id },include: [{ model: Category},{model:MovieActor,include:[{model:Actor}]},{model:Comments,include:[{model:User}]},]
    });
  }

  // async update(id: number, updateMovieDto: UpdateMovieDto): Promise<[number, Movie[]]> {
  //   return this.movieModel.update(updateMovieDto, { where: { id } });
  // }

  async uploadMovieImage(payload: UploadMovieImageRequest): Promise<void> {
    await this.#_checkUser(payload.movieId);

    let imageUrl: UploadFileResponse | null = null;

    if (payload.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }

    await this.movieModel.update(
      { image: imageUrl ? imageUrl.imageUrl : '' },
      { where: { id: payload.movieId } },
    );
  }

  // Remove a meal by ID
  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await movie.destroy();
  }

  async addComment(createCommentDto: CreateCommentsDTO): Promise<void> {
    const { movie_id, comment, user_id } = createCommentDto;
    const movie = await this.movieModel.findOne({ where: { id: movie_id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await Comments.create({
      movie_id,
      comment,
      user_id,
    });
  }

  async #_checkUser(movieId: number): Promise<void> {
    const movie = await this.movieModel.findByPk(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
  }
}
