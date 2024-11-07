import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFavorite } from './models';
import { UserFavoriteController } from './user_favorite.controller';
import { UserFavoriteService } from './user_favorite.service';

@Module({
  imports: [SequelizeModule.forFeature([UserFavorite])],
  controllers: [UserFavoriteController],
  providers: [UserFavoriteService],
})
export class UserFavoriteModule {}
