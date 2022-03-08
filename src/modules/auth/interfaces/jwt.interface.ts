import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '../../users/entity/users.entity';
export class JwtCustomPayload implements JwtPayload {
  user_id: string;
}
export interface JwtAuthorizedRequest extends Request {
  user: User;
}
export interface FacebookUser extends User {
  provider_id?: string;
}
