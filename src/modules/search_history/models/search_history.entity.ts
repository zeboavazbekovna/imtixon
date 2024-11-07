// models/SearchHistory.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user';

@Table({ tableName: 'search_histories' })
export class SearchHistory extends Model<SearchHistory> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  search_query: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  searched_at: Date;
}
