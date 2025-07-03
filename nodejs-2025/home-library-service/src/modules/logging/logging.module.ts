import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingSaveQueueService } from './logging.save-queue.service';
import { LoggingService } from './logging.service';

@Global()
@Module({
  providers: [
    LoggingService,
    LoggingSaveQueueService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [LoggingService],
})
export class LoggingModule {}
