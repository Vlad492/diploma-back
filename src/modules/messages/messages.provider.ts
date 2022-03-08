import { Connection } from 'typeorm';
import { PROVIDERS } from '../../providers/providers.enum';
import { Message } from './entity/messages.entity';

export const MessagesProvider = {
  provide: PROVIDERS.MESSAGE_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(Message),
  inject: [PROVIDERS.DATABASE_MAIN_CONNECTION],
};
