import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from '../../interfaces/env.interface';
import { CryptoService } from './crypto.service';

@Module({
  providers: [
    {
      provide: CryptoService,
      useFactory: (configService: ConfigService<IEnv>) => {
        return new CryptoService(
          +(configService.get('CRYPT_SALT', { infer: true }) ?? 10),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [CryptoService],
})
export class CryptoModule {}
