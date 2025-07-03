import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { IEnv } from '../../interfaces/env.interface';
import { CryptoModule } from '../crypto/crypto.module';
import { RepositoryModule } from '../repository/repository.module';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IEnv>) => {
        return {
          secret:
            configService.get('JWT_SECRET_KEY', { infer: true }) ??
            'secret123123',
          signOptions: {
            expiresIn:
              configService.get('TOKEN_EXPIRE_TIME', { infer: true }) ?? '1h',
          },
        };
      },
      inject: [ConfigService],
    }),
    CryptoModule,
    RepositoryModule.forFeature(USER_REPOSITORY),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
