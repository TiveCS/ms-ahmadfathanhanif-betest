import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { USERS_SERVICE } from './constants/proxy.constant';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Env } from './shared/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: USERS_SERVICE,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: config.get('SVC_USERS_HOST'),
            port: config.get('SVC_USERS_PORT'),
          },
        });
      },
    },
  ],
})
export class AppModule {}
