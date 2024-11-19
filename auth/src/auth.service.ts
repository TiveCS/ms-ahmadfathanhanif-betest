import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './shared/env';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService<Env>,
    private jwt: JwtService,
  ) {}

  async generateToken(sub: string): Promise<string> {
    return this.jwt.sign(
      {
        sub,
      },
      {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
      },
    );
  }
}
