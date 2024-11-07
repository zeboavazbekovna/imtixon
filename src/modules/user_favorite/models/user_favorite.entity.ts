// models/UserFavorite.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user';
import { Movie } from '../../movie';

@Table({ tableName: 'user_favorites' })
export class UserFavorite extends Model<UserFavorite> {
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
}
