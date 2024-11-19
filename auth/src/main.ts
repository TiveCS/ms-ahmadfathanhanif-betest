import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || process.env.SVC_AUTH_PORT || 8001;

  await app.listen(port);
}
bootstrap();
