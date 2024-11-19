import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: process.env.PORT! || 8002,
      },
    } as TcpOptions,
  );

  await app.listen();
}
bootstrap();
