import { ApiProperty } from '@nestjs/swagger';

export class CreateKayPairResponseDto {
  publicKey: string | Buffer;
  privateKey: string | Buffer;
}
export class EncryptDataRequestDto {
  @ApiProperty({ default: 'qqwe', required: true })
  payload: string;
  @ApiProperty({ default: 'qqwe', required: true })
  publicKey: string;
}
export class DecryptDataRequestDto {
  @ApiProperty({ default: 'qqwe', required: true })
  payload: string;
  @ApiProperty({ default: 'qqwe', required: true })
  privateKey: string;
}
export class EncryptDataResponseDto {
  encoded: Buffer | string;
}
export class DecryptDataResponseDto {
  decoded: Buffer | string;
}
