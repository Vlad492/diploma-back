import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PROVIDERS } from '../../providers/providers.enum';
import { User } from '../users/entity/users.entity';
import { Message } from '../messages/entity/messages.entity';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_MAIN_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: 'postgres',
        url: configService.get<string>('DATABASE_HOST'),
        entities: [User, Message],
        synchronize: true,
      }),
  },
];
