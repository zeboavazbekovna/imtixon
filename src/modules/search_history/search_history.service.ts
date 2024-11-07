import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SearchHistory } from './models';
import { CreateSearchHistoryDto } from './dto';
import { UpdateSearchHistoryDto } from './dto';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectModel(SearchHistory)
    private readonly searchHistoryModel: typeof SearchHistory,
  ) {}

  async create(createSearchHistoryDto: CreateSearchHistoryDto): Promise<SearchHistory> {
    return this.searchHistoryModel.create(createSearchHistoryDto);
  }

  async findAll(): Promise<SearchHistory[]> {
    return this.searchHistoryModel.findAll();
  }

  async findOne(id: number): Promise<SearchHistory> {
    return this.searchHistoryModel.findOne({ where: { id } });
  }

  async update(id: number, updateSearchHistoryDto: UpdateSearchHistoryDto): Promise<SearchHistory> {
    await this.searchHistoryModel.update(updateSearchHistoryDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.searchHistoryModel.destroy({ where: { id } });
  }
}
