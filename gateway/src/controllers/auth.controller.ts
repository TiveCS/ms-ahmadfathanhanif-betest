import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { AuthMessageKey } from '../constants/auth/auth-message-key.constant';
import { AUTH_SERVICE } from '../constants/proxy.constant';
import { GenerateTokenDto } from '../dto/auth/generate-token.dto';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { Public } from 'src/shared/decorators/public.decorator';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('token')
  @Public()
  @ApiCreatedResponse({ description: 'Generate token success' })
  async generateToken(@Body() dto: GenerateTokenDto) {
    const result = await firstValueFrom(
      this.authServiceClient.send(AuthMessageKey.GENERATE_TOKEN, dto),
    );

    return result;
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  @ApiSecurity('bearer')
  @ApiOkResponse({ description: 'Show my profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async me(@GetUser() user: { email: string }) {
    return user;
  }
}
