import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';

export const JwtAuth = () => applyDecorators(UseGuards(AuthGuard('jwt')));
