// models/AdminMessage.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user';

@Table({ tableName: 'admin_messages' })
export class AdminMessage extends Model<AdminMessage> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_read: boolean;
}
