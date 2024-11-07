// src/modules/device/device.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Res } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDTO } from './dto';
import { UpdateDeviceDTO } from './dto';
import { Device } from './models';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async createDevice(@Body() createDeviceDTO: CreateDeviceDTO): Promise<Device> {
    return await this.deviceService.createDevice(createDeviceDTO);
  }

  @Get(':id')
  async getDeviceById(@Param('id') id: number): Promise<Device> {
    return await this.deviceService.getDeviceById(id);
  }

  @Put(':id')
  async updateDevice(@Param('id') id: number, @Body() updateDeviceDTO: UpdateDeviceDTO): Promise<[number, Device[]]> {
    return await this.deviceService.updateDevice(id, updateDeviceDTO);
  }

  @Get()
  async getAllDevices(): Promise<Device[]> {
    return await this.deviceService.getAllDevices();
  }

  @Get('user/:userId')
  async getDevicesByUserId(@Param('userId') userId: number): Promise<Device[]> {
    return await this.deviceService.getDevicesByUserId(userId);
  }

  @Delete(':id')
  async deleteDevice(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const deletedCount = await this.deviceService.deleteDevice(id);
    return { deleted: !!deletedCount }; // Returns true if deletion was successful
  }

}
