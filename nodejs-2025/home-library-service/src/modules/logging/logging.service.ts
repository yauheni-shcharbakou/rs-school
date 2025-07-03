import { Injectable, LOG_LEVELS, LogLevel, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from '../../interfaces/env.interface';
import { LoggingSaveQueueService } from './logging.save-queue.service';

@Injectable()
export class LoggingService {
  constructor(
    private readonly configService: ConfigService<IEnv>,
    private readonly saveQueueService: LoggingSaveQueueService,
  ) {}

  private readonly logger = new Logger();

  private readonly levelIndexByLevel: Map<LogLevel, number> = LOG_LEVELS.reduce(
    (acc: Map<LogLevel, number>, level, index) => {
      acc.set(level, index);
      return acc;
    },
    new Map(),
  );

  private readonly levelIndex = this.levelIndexByLevel.get(
    this.configService.get('LOG_LEVEL', { infer: true }) ?? 'log',
  );

  private isLevelAllowed(level: LogLevel): boolean {
    const levelIndex = this.levelIndexByLevel.get(level);
    return levelIndex >= this.levelIndex;
  }

  private handleLogLevel(
    level: LogLevel,
    message: any,
    context = '',
    stack = '',
  ) {
    if (!this.isLevelAllowed(level)) {
      return;
    }

    this.logger[level](message, context);

    this.saveQueueService.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      stack,
      context,
    });
  }

  verbose(message: any, context?: string) {
    this.handleLogLevel('verbose', message, context);
  }

  debug(message: any, context?: string) {
    this.handleLogLevel('debug', message, context);
  }

  log(message: any, context?: string) {
    this.handleLogLevel('log', message, context);
  }

  warn(message: any, context?: string) {
    this.handleLogLevel('warn', message, context);
  }

  error(message: any, stack?: string, context?: string) {
    this.handleLogLevel('error', message, context, stack);
  }

  fatal(message: any, stack?: string, context?: string) {
    this.handleLogLevel('fatal', message, context, stack);
  }
}
