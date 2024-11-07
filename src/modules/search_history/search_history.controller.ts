import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service'
import { CreateSearchHistoryDto } from './dto';
import { UpdateSearchHistoryDto } from './dto';
import { SearchHistory } from './models';

@Controller('search-histories')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Post()
  async create(@Body() createSearchHistoryDto: CreateSearchHistoryDto): Promise<SearchHistory> {
    return this.searchHistoryService.create(createSearchHistoryDto);
  }

  @Get()
  async findAll(): Promise<SearchHistory[]> {
    return this.searchHistoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SearchHistory> {
    return this.searchHistoryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSearchHistoryDto: UpdateSearchHistoryDto): Promise<SearchHistory> {
    return this.searchHistoryService.update(+id, updateSearchHistoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.searchHistoryService.remove(+id);
  }
}
