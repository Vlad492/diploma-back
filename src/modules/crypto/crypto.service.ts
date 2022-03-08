import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { KeyLike, RsaPrivateKey, RsaPublicKey } from 'crypto';
import { ResponseInterface } from '../../interfaces/response.interface';
import {
  DecryptDataResponseDto,
  EncryptDataResponseDto,
} from './interfaces/crypto.inteface';
@Injectable()
export class CryptoService {
  createKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });
  }
  encrypt(
    data: string,
    config: RsaPublicKey | RsaPrivateKey | KeyLike,
  ): Buffer {
    return crypto.publicEncrypt(config, Buffer.from(data));
  }

  decrypt(
    data: string,
    config: RsaPublicKey | RsaPrivateKey | KeyLike,
  ): Buffer {
    return crypto.privateDecrypt(config, Buffer.from(data, 'base64'));
  }
  toConfig(key: string) {
    return {
      key: key,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    };
  }
}
