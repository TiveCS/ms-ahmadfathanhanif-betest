import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { AUTH_SERVICE, USERS_SERVICE } from './constants/proxy.constant';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Env } from './shared/env';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
    }),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    JwtStrategy,
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
    {
      provide: AUTH_SERVICE,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: config.get('SVC_AUTH_HOST'),
            port: config.get('SVC_AUTH_PORT'),
          },
        });
      },
    },
  ],
})
export class AppModule {}
