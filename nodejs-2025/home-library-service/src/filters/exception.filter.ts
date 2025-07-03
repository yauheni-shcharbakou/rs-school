import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import { LoggingService } from '../modules/logging/logging.service';

type ResponseData = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  private parseExceptionMessage(exception: Error): string {
    if (!(exception instanceof HttpException)) {
      return exception.message;
    }

    const response = exception.getResponse();

    if (typeof response !== 'object') {
      return response;
    }

    if (typeof response['message'] === 'string') {
      return response['message'];
    }

    if (Array.isArray(response['message'])) {
      return response['message'].join(', ');
    }

    return 'Unknown exception';
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequest>();

    const responseData: ResponseData = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: this.parseExceptionMessage(exception),
    };

    if (exception instanceof HttpException) {
      responseData.statusCode = exception.getStatus();
    }

    const url = request.url;
    const method = request.method;
    const data = JSON.stringify(responseData, null, 2);
    const responseLog = `${method} ${url}\nResponse: ${data}`;

    this.loggingService.error(exception, exception.stack);
    this.loggingService.debug(responseLog, request['controller']);

    response.status(responseData.statusCode).json(responseData);
  }
}
