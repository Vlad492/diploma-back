import { Connection } from 'typeorm';
import { PROVIDERS } from '../../providers/providers.enum';
import { User } from './entity/users.entity';

export const UsersProvider = {
  provide: PROVIDERS.USER_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: [PROVIDERS.DATABASE_MAIN_CONNECTION],
};
