import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [CryptoService],
  controllers: [CryptoController],
  exports: [CryptoService],
})
export class CryptoModule {}
