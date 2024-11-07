import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription,
  ) {}

  async createSubscription(dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionModel.create(dto);
  }

  async findAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionModel.findAll();
  }

  async findSubscriptionById(id: number): Promise<Subscription> {
    return this.subscriptionModel.findByPk(id);
  }

  async updateSubscription(id: number, dto: UpdateSubscriptionDto): Promise<Subscription> {
    await this.subscriptionModel.update(dto, { where: { id } });
    return this.findSubscriptionById(id);
  }

  async deleteSubscription(id: number): Promise<void> {
    await this.subscriptionModel.destroy({ where: { id } });
  }
}
