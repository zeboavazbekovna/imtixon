import { Module } from '@nestjs/common';
import { MovieCategoryService } from './movie_category.service';
import { MovieCategoryController } from './movie_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory } from './models';

@Module({
  imports: [SequelizeModule.forFeature([MovieCategory])],
  controllers: [MovieCategoryController],
  providers: [MovieCategoryService],
  exports: [MovieCategoryService],
})
export class MovieCategoryModule {}
