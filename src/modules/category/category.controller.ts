// controllers/category.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto';
import { Category } from './models';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<CreateCategoryDTO>): Promise<Category> {
    return this.categoryService.updateCategory(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
