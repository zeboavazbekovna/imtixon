import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { User } from '../../user'; // Foydalanuvchilarni ko'rsatish uchun
import { Comments } from '../../comment'; // Sharhlarni boshqarish uchun
import { Movie } from '../../movie'; // Filmlarni boshqarish uchun

@Table({ tableName: 'admin_users' })
export class AdminUser extends Model<AdminUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
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
}
