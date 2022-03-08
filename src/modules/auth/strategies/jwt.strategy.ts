import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtCustomPayload } from '../interfaces/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entity/users.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: JwtCustomPayload): Promise<User> {
    const user: User = await this.userService.getOne({
      user_id: payload.user_id,
    });
    if (user) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException();
  }
}
