import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.token.generate')
  async generateToken(payload: { email: string }) {
    return await this.authService.generateToken(payload.email);
  }
}
