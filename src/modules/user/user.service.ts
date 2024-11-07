import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findUserById(id: number): Promise<User> {
    return await this.userModel.findByPk(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return await user.update(updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }
}
