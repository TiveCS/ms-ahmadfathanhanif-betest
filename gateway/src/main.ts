import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('BE Test API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocumentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocumentFactory());

  const port = process.env.PORT || process.env.GATEWAY_PORT || 8000;

  await app.listen(port);
}
bootstrap();
