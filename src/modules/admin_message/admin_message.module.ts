import { Module } from '@nestjs/common';
import { AdminMessageService } from './admin_message.service';
import { AdminMessageController } from './admin_message.controller';

@Module({
  controllers: [AdminMessageController],
  providers: [AdminMessageService],
})
export class AdminMessageModule {}
