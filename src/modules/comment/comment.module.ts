// modules/CommentsModule.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';
import { Comments } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
