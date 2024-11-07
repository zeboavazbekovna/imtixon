import { Module } from '@nestjs/common';
import { MovieActorController } from './movie_actor.controller';
import { MovieActorService } from './movie_actor.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieActor } from './models';
import { MovieModule } from '../movie/movie.module';
import { Actor } from '../actor';

@Module({
  imports: [SequelizeModule.forFeature([MovieActor])],
  controllers: [MovieActorController],
  providers: [MovieActorService],
})
export class MovieActorModule {}
