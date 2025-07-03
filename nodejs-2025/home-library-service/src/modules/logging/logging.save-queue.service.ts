import {
  Injectable,
  LogLevel,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { constants } from 'fs';
import { access, appendFile, mkdir, readdir, stat } from 'fs/promises';
import { EventEmitter } from 'events';
import { join, resolve } from 'path';
import { IEnv } from '../../interfaces/env.interface';

type LogData = {
  timestamp: string;
  level: LogLevel;
  message: any;
  stack?: string;
  context?: string;
};

@Injectable()
export class LoggingSaveQueueService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService<IEnv>) {}

  private currentIndex = 0;
  private currentErrorIndex = 0;
  private isInitialized = false;
  private readonly queue: LogData[] = [];
  private inProcess = false;
  private readonly emitter = new EventEmitter();

  private readonly fileMaxSize =
    +(this.configService.get('LOG_MAX_SIZE_KB', { infer: true }) ?? 100) * 1024;

  private readonly logPath = resolve(
    __dirname,
    '../../..',
    this.configService.get('LOG_DIRECTORY', { infer: true }) ?? 'logs',
  );

  private async getLogFileName(
    prefix: string,
    level: LogLevel,
    content: string,
  ): Promise<string> {
    const isError = level === 'error' || level === 'fatal';
    const suffix = isError ? 'error.log' : 'log';
    let index = isError ? this.currentErrorIndex : this.currentIndex;
    const potentialName = `${prefix}.${index}.${suffix}`;

    let fileSize = 0;

    try {
      const potentialFilePath = join(this.logPath, prefix, potentialName);
      const logStat = await stat(potentialFilePath);
      fileSize = logStat.size;
    } catch (e) {}

    const contentSize = Buffer.byteLength(content, 'utf-8');

    if (fileSize + contentSize > this.fileMaxSize) {
      index += 1;
      this[isError ? 'currentErrorIndex' : 'currentIndex'] = index;
    }

    return [prefix, index, suffix].join('.');
  }

  private async saveLog(data: LogData): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }

    const [dayTimestamp] = data.timestamp.split('T');
    const dirname = resolve(this.logPath, dayTimestamp);

    try {
      await access(dirname, constants.W_OK | constants.R_OK);
    } catch (error) {
      await mkdir(dirname, { recursive: true });
    }

    const templateParts = [
      `[Nest] ${process.pid} - ${data.timestamp}\t${data.level.toUpperCase()} `,
    ];

    if (data.context) {
      templateParts.push(`[${data.context}] `);
    }

    if (data.stack) {
      templateParts.push(`${data.stack}\n`);
    }

    const stringMessage =
      typeof data.message === 'object'
        ? JSON.stringify(data.message, null, 2)
        : data.message?.toString();

    templateParts.push(stringMessage);

    const logContent = templateParts.join('') + '\n';

    const fileName = await this.getLogFileName(
      dayTimestamp,
      data.level,
      logContent,
    );

    const filePath = join(dirname, fileName);
    await appendFile(filePath, logContent, { encoding: 'utf-8' });
  }

  private async init(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    const timestamp = new Date().toISOString();
    const [dayTimestamp] = timestamp.split('T');
    const dirname = resolve(this.logPath, dayTimestamp);

    try {
      await access(dirname, constants.W_OK | constants.R_OK);
    } catch (error) {
      await mkdir(dirname, { recursive: true });
      return;
    }

    const logNames = await readdir(dirname, { encoding: 'utf-8' });

    for (const logName of logNames) {
      const [, index, suffix] = logName.split('.');
      const logIndex = +index;

      if (suffix === 'error') {
        if (logIndex > this.currentErrorIndex) {
          this.currentErrorIndex = logIndex;
        }

        continue;
      }

      if (logIndex > this.currentIndex) {
        this.currentIndex = logIndex;
      }
    }

    this.isInitialized = true;
  }

  private async handleQueue() {
    if (this.inProcess) {
      return;
    }

    while (this.queue.length) {
      this.inProcess = true;
      const currentLog = this.queue.shift();
      await this.saveLog(currentLog);
    }

    this.inProcess = false;
    this.emitter.emit('queue-handled');
  }

  async onModuleInit() {
    await this.init();
  }

  async onModuleDestroy() {
    if (this.inProcess) {
      await new Promise((resolve) => {
        this.emitter.once('queue-handled', resolve);
      });
    }
  }

  push(data: LogData) {
    this.queue.push(data);
    this.handleQueue().catch();
  }
}
