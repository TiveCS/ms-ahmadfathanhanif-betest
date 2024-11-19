import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: process.env.PORT || process.env.SVC_AUTH_PORT || 8001,
      },
    } as TcpOptions,
  );

  await app.listen();
}
bootstrap();
