import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';
import { MessagesProvider } from './messages.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, MailerModule, UsersModule, CryptoModule],
  providers: [MessagesService, MessagesProvider],
  controllers: [MessagesController],
})
export class MessagesModule {}
