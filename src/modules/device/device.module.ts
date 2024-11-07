// src/modules/device/device.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Device } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Device])],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
