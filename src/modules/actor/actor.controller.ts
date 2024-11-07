import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './models';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createActor(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorService.createActor(createActorDto);
  }

  @Get()
  async findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Actor> {
    return this.actorService.findOne(id);
  }

  @Put(':id')
  async updateActor(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto): Promise<Actor> {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeActor(@Param('id') id: number): Promise<void> {
    await this.actorService.removeActor(id);
  }
}
