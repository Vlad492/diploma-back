import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtCustomPayload } from './interfaces/jwt.interface'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}
	async createToken(payload: JwtCustomPayload) {
		return this.jwtService.sign(payload)
	}
}
