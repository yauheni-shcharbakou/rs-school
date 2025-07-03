import { LogLevel } from '@nestjs/common';

export interface IEnv {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  LOG_LEVEL: LogLevel;
  LOG_MAX_SIZE_KB: string;
  LOG_DIRECTORY: string;

  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  DATABASE_URL: string;

  CRYPT_SALT: string;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
}
