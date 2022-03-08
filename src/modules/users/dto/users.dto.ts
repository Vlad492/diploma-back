import { ApiProperty } from '@nestjs/swagger';

export class AutenticateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
