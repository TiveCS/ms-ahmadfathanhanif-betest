import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Get()
  getHello(): string {
    return 'Hello from Auth Controller';
  }
}
