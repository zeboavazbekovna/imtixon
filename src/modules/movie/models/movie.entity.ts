// models/Movie.ts
import { Column, Model, Table, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Comments } from '../../comment';
import { MovieActor } from '../../movie_actor';
import { Category } from 'src/modules/category';

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie> {
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
  title: string;
  @Column({
    type: DataType.STRING,
  })
  image: string;
  @Column({
    type: DataType.TEXT,
  })
  video: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  release_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  duration: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, 
  })
  is_premium: boolean;

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => MovieActor)
  movieActors: MovieActor[];

  // Category bilan aloqani ko'rsatadi
  @BelongsTo(() => Category)
  category: Category;
}
