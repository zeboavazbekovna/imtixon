// models/MovieCategory.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Movie } from '../../movie';
import { Category } from '../../category';

@Table({ tableName: 'movie_categories' })
export class MovieCategory extends Model<MovieCategory> {
  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  movie_id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;
}
