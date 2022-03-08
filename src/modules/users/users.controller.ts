import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { AutenticateUserDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthorizedRequest } from '../auth/interfaces/jwt.interface';
import { JwtAuth } from '../../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get()
  @ApiBearerAuth()
  @JwtAuth()
  async getUser(@Req() request: JwtAuthorizedRequest) {
    console.log(request.user);
    return request.user;
  }
  @Post()
  async createUser(@Body() user: User) {
    if (user.password) {
      const hash = await bcrypt.hash(
        user.password,
        parseInt(this.configService.get<string>('HASH_NUMBER')),
      );
      user.password = hash;
    } else {
      throw new HttpException('No password', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.saveUser(user);
  }
  @Put()
  @ApiBearerAuth()
  @JwtAuth()
  updateUser(@Body() user: User) {
    return this.usersService.saveUser(user);
  }
  @Post('/login')
  async login(@Body() body: AutenticateUserDto) {
    try {
      const userResult = await this.usersService.getOne({
        email: body.email,
      });
      const passwordComparing = await bcrypt.compare(
        body.password,
        userResult.password,
      );
      if (passwordComparing) {
        const token = await this.authService.createToken({
          user_id: userResult.user_id,
        });
        return { access_token: token };
      } else {
        throw new HttpException(
          'Password doesnt match',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
