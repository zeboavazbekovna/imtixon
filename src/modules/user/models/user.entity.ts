// models/User.ts
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Comments } from '../../comment';
import { Subscription } from '../../subscription';
import { Device } from '../../device';
import { UserFavorite } from '../../user_favorite';
import { SearchHistory } from '../../search_history';

@Table({ tableName: 'users' })
export class User extends Model<User> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0.0,
  })
  balance?: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_premium?: boolean;

  @HasMany(() => Comments)
  reviews: Comments[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => UserFavorite)
  favorites: UserFavorite[];

  @HasMany(() => SearchHistory) // SearchHistory bilan bog'lanish
  searchHistories: SearchHistory[];
}
