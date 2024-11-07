import { Injectable } from '@nestjs/common';
import { User } from '../user'; // Admin modeli
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { Movie, UpdateMovieDto } from '../movie';
import { Category, UpdateCategoryDto } from '../category';
import { Comments, UpdateCommentsDTO } from '../comment';

@Injectable()
export class AdminService {
  async getAllUsers() {
    return await User.findAll();
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const newAdmin = await User.create(createAdminDto);
    return newAdmin;
  }

  async updateUser(id: number, updateUserDto: UpdateAdminDto) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(updateUserDto);
    }
    throw new Error('User not found');
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return { message: 'User deleted successfully' };
    }
    throw new Error('User not found');
  }

  async getAllMovies() {
    return await Movie.findAll();
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await Movie.findByPk(id);
    if (movie) {
      return await movie.update(updateMovieDto);
    }
    throw new Error('Movie not found');
  }

  async deleteMovie(id: number) {
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.destroy();
      return { message: 'Movie deleted successfully' };
    }
    throw new Error('Movie not found');
  }

  async getAllCategories() {
    return await Category.findAll();
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await Category.findByPk(id);
    if (category) {
      return await category.update(updateCategoryDto);
    }
    throw new Error('Category not found');
  }

  async deleteCategory(id: number) {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return { message: 'Category deleted successfully' };
    }
    throw new Error('Category not found');
  }

  async getAllComments() {
    return await Comments.findAll();
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentsDTO) {
    const comment = await Comments.findByPk(id);
    if (comment) {
      return await comment.update(updateCommentDto);
    }
    throw new Error('Comment not found');
  }

  async deleteComment(id: number) {
    const comment = await Comments.findByPk(id);
    if (comment) {
      await comment.destroy();
      return { message: 'Comment deleted successfully' };
    }
    throw new Error('Comment not found');
  }
}
