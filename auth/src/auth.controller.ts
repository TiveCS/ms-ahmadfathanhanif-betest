import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { GenerateTokenResponse } from './responses/generate-token.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.token.generate')
  async generateToken(payload: ITokenPayload): Promise<GenerateTokenResponse> {
    const token = await this.authService.generateToken(payload.email);

    return {
      status: HttpStatus.CREATED,
      data: token,
    };
  }
}
