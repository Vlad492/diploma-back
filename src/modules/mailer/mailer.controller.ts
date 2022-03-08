import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import {
  SendMailOptions,
  SendMessageOptions,
} from './interfaces/mailer.interface';
import { ResponseInterface } from '../../interfaces/response.interface';
import { CreateKayPairResponseDto } from '../crypto/interfaces/crypto.inteface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post('send')
  async sendEmail(
    @Body() sendMailOptions: SendMailOptions,
  ): Promise<ResponseInterface<{ status: string }>> {
    try {
      await this.mailerService.sendEmail(sendMailOptions);
      return { data: { status: 'ok' } };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('send/message')
  async sendMessageToUser(
    @Body() sendMessageOptions: SendMessageOptions,
  ): Promise<ResponseInterface<{ status: string }>> {
    try {
      await this.mailerService.sendEmail({
        from: 'vladyslav.hleb.diploma@gmail.com',
        to: sendMessageOptions.email,
        text: sendMessageOptions.text,
        subject: 'You have new message',
      });

      return { data: { status: 'ok' } };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
