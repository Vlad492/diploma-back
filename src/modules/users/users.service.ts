import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../providers/providers.enum';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}
  async saveUser(user: Partial<User>) {
    return await this.userRepository.save(user);
  }
  async getOne(user: Partial<User>) {
    return await this.userRepository.findOne(user);
  }
}
