import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserFavorite } from './models';
import { CreateUserFavoriteDto } from './dto';
import { UpdateUserFavoriteDto } from './dto';

@Injectable()
export class UserFavoriteService {
  constructor(
    @InjectModel(UserFavorite)
    private readonly userFavoriteModel: typeof UserFavorite,
  ) {}

  async create(createUserFavoriteDto: CreateUserFavoriteDto): Promise<UserFavorite> {
    return this.userFavoriteModel.create(createUserFavoriteDto);
  }

  async findAll(user_id: number): Promise<UserFavorite[]> {
    return this.userFavoriteModel.findAll({ where: { user_id } });
  }

  async findOne(id: number): Promise<UserFavorite> {
    return this.userFavoriteModel.findByPk(id);
  }

  async update(id: number, updateUserFavoriteDto: UpdateUserFavoriteDto): Promise<UserFavorite> {
    await this.userFavoriteModel.update(updateUserFavoriteDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userFavoriteModel.destroy({ where: { id } });
  }
}
