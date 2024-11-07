import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Actor } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Actor])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
