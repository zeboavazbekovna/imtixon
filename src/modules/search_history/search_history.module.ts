import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SearchHistoryController } from './search_history.controller';
import { SearchHistoryService } from './search_history.service';
import { SearchHistory } from './models';

@Module({
  imports: [SequelizeModule.forFeature([SearchHistory])],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
})
export class SearchHistoryModule {}
