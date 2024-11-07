import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { UpdateMovieDto } from '../movie';
import { UpdateCategoryDto } from '../category';
import { UpdateCommentsDTO } from '../comment';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User-related routes
  @Get('users')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  @Post('users')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.updateUser(id, updateAdminDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.adminService.deleteUser(id);
  }

  // Movie-related routes
  @Get('movies')
  async getAllMovies() {
    return await this.adminService.getAllMovies();
  }

  @Put('movies/:id')
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.adminService.updateMovie(id, updateMovieDto);
  }

  @Delete('movies/:id')
  async deleteMovie(@Param('id') id: number) {
    return await this.adminService.deleteMovie(id);
  }

  // Category-related routes
  @Get('categories')
  async getAllCategories() {
    return await this.adminService.getAllCategories();
  }

  @Put('categories/:id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.adminService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: number) {
    return await this.adminService.deleteCategory(id);
  }

  // Comment-related routes
  @Get('comments')
  async getAllComments() {
    return await this.adminService.getAllComments();
  }

  @Put('comments/:id')
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentsDTO) {
    return await this.adminService.updateComment(id, updateCommentDto);
  }

  @Delete('comments/:id')
  async deleteComment(@Param('id') id: number) {
    return await this.adminService.deleteComment(id);
  }
}
