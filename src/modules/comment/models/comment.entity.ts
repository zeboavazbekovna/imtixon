// models/Review.ts
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../user';
import { Movie } from '../../movie';

@Table({ tableName: 'comments' })
export class Comments extends Model<Comments> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  movie_id: number;


  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Movie)
  movie: Movie;
}
