// modules/MovieModule.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { UploadModule } from 'src/modules/upload';
import { CategoryModule } from '../category';
import { CommentsModule } from '../comment';

@Module({
  imports: [SequelizeModule.forFeature([Movie]),UploadModule,CategoryModule,CommentsModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
