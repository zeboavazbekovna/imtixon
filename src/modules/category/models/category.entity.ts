// models/Category.ts
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { MovieCategory } from '../../movie_category';
import { Movie } from 'src/modules/movie';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => MovieCategory)
  movieCategories: MovieCategory[];

  @HasMany(() => Movie)
  movies: Movie[];
  
}
