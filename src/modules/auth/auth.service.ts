import { Injectable, NotFoundException, UnprocessableEntityException, ConflictException, BadRequestException, InternalServerErrorException, ConsoleLogger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user';
import { Device, DeviceService } from '../device';
import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RegisterRequest, RegisterResponse } from './interfaces';
import DeviceDetector from 'device-detector-js';
import { TokenExpiredError } from '@nestjs/jwt';
import { NotBeforeError,JsonWebTokenError } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly deviceService: DeviceService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  // Foydalanuvchini login qilish funksiyasi
  async login(payload: LoginRequest, userAgent: string): Promise<LoginResponse> {
    const foundedUser = await this.userModel.findOne({
      where: { email: payload.email.toLowerCase(), password: payload.password },
    });

    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }

    const accessToken = await this.jwt.signAsync(
      {
        id: foundedUser.id,
      },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: foundedUser.id,
      },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    // Qurilma ma'lumotlarini saqlash
    const deviceName = this.getDeviceName(userAgent);
    await this.saveDeviceData(foundedUser.id, deviceName);

    return {
      message: 'Kirish muvaffaqiyatli amalga oshirildi',
      id:foundedUser.id,
      accessToken,
      refreshToken,
      name: foundedUser.name,
      email:foundedUser.email
    };
  }

  // Ro'yxatdan o'tish funksiyasi
  async register(payload: RegisterRequest, userAgent: string): Promise<RegisterResponse> {
    try {
      const newUser = await this.userModel.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
  
      // Tokenlar generatsiyasi
      const accessToken = await this.jwt.signAsync({ id: newUser.id }, {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      });
      const refreshToken = await this.jwt.signAsync({ id: newUser.id }, {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      });
  
      const deviceName = this.getDeviceName(userAgent);
      await this.saveDeviceData(newUser.id, deviceName);
  
      return {
        name: newUser.name,
        email: newUser.email,
        id:newUser.id,
        message: 'Ro‘yxatdan o‘tish muvaffaqiyatli amalga oshirildi',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Server bilan bog\'lanishda xatolik: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  // Qurilma ma'lumotlarini saqlash uchun yordamchi funksiya
  private async saveDeviceData(userId: number, deviceName: string): Promise<Device> {
    return await this.deviceService.createDevice({
      user_id: userId,
      device_name: deviceName,
      last_login: new Date(),
    });
  }

  // Qurilmalar nomini olish
  private getDeviceName(userAgent: string): string {
    const detector = new DeviceDetector();
    const device = detector.parse(userAgent);

    console.log(device)
    return `${device.device?.brand || 'Unknown'},${device.os?.name},${device.os?.version} ${device.device?.type || 'Unknown'}` ;
  }

  // Refresh token olish funksiyasi
  async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
    try {
      this.jwt.verify(payload.refreshToken, { secret: this.config.get<string>('jwt.refreshKey') });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Token already expired');
      }
      if (error instanceof NotBeforeError) {
        throw new ConflictException('Token not before error');
      }
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Internal error occurred');
    }

    const userDecodedData = this.jwt.decode(payload.refreshToken) as { id: number };

    const accessToken = await this.jwt.signAsync(
      {
        id: userDecodedData.id,
      },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: userDecodedData.id,
      },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    return {
      message: 'Successfully refreshed',
      accessToken,
      refreshToken,
    };
  }
}
