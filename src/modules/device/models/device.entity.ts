// models/Device.ts
import { Column, Model, Table, DataType, ForeignKey, Default } from 'sequelize-typescript';
import { User } from '../../user';

@Table({ tableName: 'devices' })
export class Device extends Model<Device> {
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
  })
  device_name?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  last_login: Date;
}
