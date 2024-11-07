// services/CommentsService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './models';
import { CreateCommentsDTO } from './dto';
import { UpdateCommentsDTO } from './dto';
import { User } from '../user';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentsModel: typeof Comments,
  ) {}

  async createComment(createCommentsDTO: CreateCommentsDTO): Promise<Comments> {
    return await this.commentsModel.create(createCommentsDTO);
  }

  async getAllComments(): Promise<Comments[]> {
    return await this.commentsModel.findAll({ include: { model: User } }); // Barcha izohlarni olish
  }

  async getCommentById(id: number): Promise<Comments | null> {
    return await this.commentsModel.findByPk(id,{include:{model:User}});
  }

  async updateComment(id: number, updateCommentsDTO: UpdateCommentsDTO): Promise<number> {
    const [affectedCount] = await this.commentsModel.update(updateCommentsDTO, { where: { id } });
    return affectedCount;
  }
  

  async deleteComment(id: number): Promise<number> {
    return await this.commentsModel.destroy({ where: { id } });
  }
}
