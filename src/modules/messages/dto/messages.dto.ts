import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ default: 'email' })
  email: string;
  @ApiProperty({ default: 'payload' })
  message: string;
}
