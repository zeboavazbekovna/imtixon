import { PartialType } from '@nestjs/swagger';
import { CreateAdminMessageDto } from './create-admin_message.dto';

export class UpdateAdminMessageDto extends PartialType(CreateAdminMessageDto) {}
