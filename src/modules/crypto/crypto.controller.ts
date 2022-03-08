import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ResponseInterface } from '../../interfaces/response.interface';
import * as crypto from 'crypto';
import {
  CreateKayPairResponseDto,
  DecryptDataRequestDto,
  EncryptDataRequestDto,
} from './interfaces/crypto.inteface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuth } from '../../guards/jwt.guard';
import { UsersService } from '../users/users.service';
import { JwtAuthorizedRequest } from '../auth/interfaces/jwt.interface';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}
  @ApiBearerAuth()
  @JwtAuth()
  @Post('create')
  createKeyPair(
    @Req() req: JwtAuthorizedRequest,
  ): ResponseInterface<CreateKayPairResponseDto> {
    const { privateKey, publicKey } = this.cryptoService.createKeyPair();
    this.usersService.saveUser({
      user_id: req.user.user_id,
      publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }).toString(),
    });
    return {
      data: {
        privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
        publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
      },
    };
  }
  @Post('encrypt')
  encryptMessage(
    @Body() body: EncryptDataRequestDto,
  ): ResponseInterface<{ encoded: string }> {
    const res = this.cryptoService
      .encrypt(body.payload, this.cryptoService.toConfig(body.publicKey))
      .toString('base64');
    return { data: { encoded: res } };
  }
  @Post('decrypt')
  decryptMessage(
    @Body() body: DecryptDataRequestDto,
  ): ResponseInterface<{ decoded: string }> {
    const res = this.cryptoService
      .decrypt(body.payload, this.cryptoService.toConfig(body.privateKey))
      .toString();
    return { data: { decoded: res } };
  }
}
