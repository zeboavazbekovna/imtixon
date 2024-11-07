import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './models';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionService.createSubscription(dto);
  }

  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAllSubscriptions();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Subscription> {
    return this.subscriptionService.findSubscriptionById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionService.updateSubscription(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.subscriptionService.deleteSubscription(id);
  }
}
