// services/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models';
import { CreateCategoryDTO } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDTO): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;
    return await category.save();
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async findCategoryById(id: number): Promise<Category> {
    return await this.categoryModel.findByPk(id);
  }

  async updateCategory(id: number, updateData: Partial<CreateCategoryDTO>): Promise<Category> {
    const category = await this.findCategoryById(id);
    if (category) {
      category.name = updateData.name ?? category.name;
      return await category.save();
    }
    throw new Error('Category not found');
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);
    if (category) {
      await category.destroy();
    } else {
      throw new Error('Category not found');
    }
  }
}
