import { ApiProperty } from '@nestjs/swagger';

export class SendMailOptions {
  @ApiProperty({ nullable: true, default: 'vladyslav.hleb.diploma@gmail.com' })
  from: string;
  @ApiProperty({ nullable: true, default: 'vladyslav.hleb@gmail.com' })
  to: string;
  @ApiProperty({ nullable: true, default: 'qwe' })
  subject: string;
  @ApiProperty({ nullable: true, default: 'qwe' })
  text: string;
}

export class SendMessageOptions {
  @ApiProperty({ nullable: true, default: 'vladyslav.hleb@gmail.com' })
  email: string;
  @ApiProperty({ nullable: true, default: 'qwe' })
  text: string;
}
