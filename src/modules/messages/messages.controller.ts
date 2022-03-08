import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CryptoService } from '../crypto/crypto.service';
import { MailerService } from '../mailer/mailer.service';
import { SendMessageDto } from './dto/messages.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizedUser } from '../../decorators/authUser.decorator';
import { User } from '../users/entity/users.entity';
import { MessagesService } from './messages.service';
import { JwtAuth } from '../../guards/jwt.guard';
import { ErrorResponse } from '../../handlers/exeption.handler';
import { ResponseInterface } from '../../interfaces/response.interface';
import { Message } from './entity/messages.entity';
import { ResponseData } from '../../handlers/response.handler';

@ApiTags('Message Endpoints')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}
  @JwtAuth()
  @ApiBearerAuth()
  @Post()
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @AuthorizedUser() user: User,
  ): Promise<ResponseInterface<{ message_id: string }>> {
    const receiver = await this.usersService.getOne({
      email: sendMessageDto.email,
    });
    if (!receiver) {
      throw new HttpException(
        ErrorResponse('Receiver not found'),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!receiver?.publicKey) {
      throw new HttpException(
        ErrorResponse('Received doesnt have public key'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const message = await this.messagesService.save({
      payload: this.cryptoService
        .encrypt(
          sendMessageDto.message,
          this.cryptoService.toConfig(receiver.publicKey),
        )
        .toString('base64'),
      sender: { user_id: user.user_id },
      receiver: { user_id: receiver.user_id },
    });
    console.log(receiver);
    await this.mailerService.sendEmail({
      from: 'vladyslav.hleb.diploma@gmail.com',
      to: sendMessageDto.email,
      subject: 'New Message',
      text: `You have received new message from ${user.nickname}`,
    });
    return ResponseData<{ message_id: string }>({
      message_id: message.message_id,
    });
  }
  @JwtAuth()
  @ApiBearerAuth()
  @Get()
  async getUnreadMesagesList(
    @AuthorizedUser() user: User,
  ): Promise<ResponseInterface<Array<Message>>> {
    const res = await this.messagesService.find({
      where: { receiver: { user_id: user.user_id } },
      order: { read: 'ASC' },
    });
    return ResponseData<Array<Message>>(res);
  }
  @JwtAuth()
  @ApiBearerAuth()
  @Put()
  async updateMessage(
    @AuthorizedUser() user: User,
    @Body() message: Message,
  ): Promise<ResponseInterface<Message>> {
    await this.messagesService.validateAccess(message, user);
    const res = await this.messagesService.save(message);
    return ResponseData<Message>(res);
  }
  @JwtAuth()
  @ApiBearerAuth()
  @Delete()
  async removeMessage(
    @AuthorizedUser() user: User,
    @Body() message: Message,
  ): Promise<ResponseInterface<Message>> {
    await this.messagesService.validateAccess(message, user);
    const res = await this.messagesService.remove(message);
    return ResponseData<Message>(res);
  }
}
