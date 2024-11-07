// controllers/CommentsController.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentsDTO } from './dto';
import { UpdateCommentsDTO } from './dto';
import { Comments } from './models';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() createCommentsDTO: CreateCommentsDTO): Promise<Comments> {
    return this.commentsService.createComment(createCommentsDTO);
  }

  @Get() // Barcha izohlarni olish
  async getAllComments(): Promise<Comments[]> {
    return this.commentsService.getAllComments(); // CommentsService metodiga chaqiruv
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number): Promise<Comments> {
    return this.commentsService.getCommentById(id);
  }

  @Patch(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentsDTO: UpdateCommentsDTO
  ): Promise<number> {
    return this.commentsService.updateComment(id, updateCommentsDTO);
  }
  

  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<string> {
    await this.commentsService.deleteComment(id);
    return 'Comment deleted successfully';
  }
}
