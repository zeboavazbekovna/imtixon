import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actor } from './models';
import { CreateActorDto, UpdateActorDto } from './dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor)
    private readonly actorModel: typeof Actor,
  ) {}

  async createActor(createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorModel.create({ ...createActorDto });
  }

  async findAll(): Promise<Actor[]> {
    return this.actorModel.findAll();
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorModel.findByPk(id);
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    return actor;
  }

  async updateActor(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const actor = await this.findOne(id);
    return actor.update(updateActorDto);
  }

  async removeActor(id: number): Promise<void> {
    const actor = await this.findOne(id);
    await actor.destroy();
  }
}
