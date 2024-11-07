// models/Subscription.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user';

@Table({ tableName: 'subscriptions' })
export class Subscription extends Model<Subscription> {
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
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;
}
