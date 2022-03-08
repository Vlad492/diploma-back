import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../providers/providers.enum';
import { Repository } from 'typeorm';
import { User } from '../users/entity/users.entity';
import { Message } from './entity/messages.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ErrorResponse } from '../../handlers/exeption.handler';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(PROVIDERS.MESSAGE_REPOSITORY)
    private messageRepository: Repository<Message>,
  ) {}
  async save(message: Partial<Message>) {
    return this.messageRepository.save(message);
  }
  async remove(message: Message) {
    return this.messageRepository.remove(message);
  }
  async find(options: FindManyOptions<Message>) {
    return this.messageRepository.find(options);
  }
  async validateAccess(message: Message | Partial<Message>, user: User) {
    const messageFromDB = await this.find({
      where: { message_id: message.message_id },
      relations: ['receiver'],
    });
    if (!messageFromDB.length) {
      throw new HttpException(
        ErrorResponse('Message not found'),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (messageFromDB[0].receiver.user_id !== user.user_id) {
      throw new HttpException(
        ErrorResponse('You have no access to this message'),
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
