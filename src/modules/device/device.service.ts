// src/modules/device/device.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './models';
import { CreateDeviceDTO } from './dto';
import { UpdateDeviceDTO } from './dto';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device) private deviceModel: typeof Device) {}

  async createDevice(createDeviceDTO: CreateDeviceDTO): Promise<Device> {
    return await this.deviceModel.create(createDeviceDTO);
  }

  async getDeviceById(id: number): Promise<Device> {
    return await this.deviceModel.findByPk(id);
  }

  async updateDevice(id: number, updateDeviceDTO: UpdateDeviceDTO): Promise<[number, Device[]]> {
    return await this.deviceModel.update(updateDeviceDTO, { where: { id }, returning: true });
  }

  async deleteDevice(id: number): Promise<number> {
    const deleted = await this.deviceModel.destroy({
      where: { id },
    });
    return deleted; // returns the number of deleted rows
  }

  async getAllDevices(): Promise<Device[]> {
    return await this.deviceModel.findAll();
  }
  async getDevicesByUserId(user_id: number): Promise<Device[]> {
    return await this.deviceModel.findAll({
      where: { user_id },
    });
  }


}
