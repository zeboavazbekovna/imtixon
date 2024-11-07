import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UserFavoriteService } from './user_favorite.service';
import { CreateUserFavoriteDto } from './dto';
import { UpdateUserFavoriteDto } from './dto';
import { UserFavorite } from './models';

@Controller('user-favorites')
export class UserFavoriteController {
  constructor(private readonly userFavoriteService: UserFavoriteService) {}

  @Post()
  async create(@Body() createUserFavoriteDto: CreateUserFavoriteDto): Promise<UserFavorite> {
    return this.userFavoriteService.create(createUserFavoriteDto);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: number): Promise<UserFavorite[]> {
    return this.userFavoriteService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserFavorite> {
    return this.userFavoriteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserFavoriteDto: UpdateUserFavoriteDto): Promise<UserFavorite> {
    return this.userFavoriteService.update(id, updateUserFavoriteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userFavoriteService.remove(id);
  }
}
