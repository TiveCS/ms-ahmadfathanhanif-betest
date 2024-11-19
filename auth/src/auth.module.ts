import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Env } from './shared/env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../.env', '.env'] }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
