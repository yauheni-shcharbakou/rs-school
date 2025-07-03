import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IRequest } from '../../interfaces/request.interface';
import { LoggingService } from './logging.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<IRequest>();
    const controller = context.getClass();

    request.controller = controller.name;

    const body = request.body;
    const query = request.query;
    const url = request.url;
    const method = request.method;

    const requestLog = `${method} ${url}\nRequest: ${JSON.stringify({ body, query }, null, 2)}`;
    this.loggingService.debug(requestLog, controller.name);

    return next.handle().pipe(
      map((response) => {
        const responseData =
          typeof response === 'object'
            ? JSON.stringify(response, null, 2)
            : response?.toString();

        const responseLog = `${method} ${url}\nResponse: ${responseData}`;
        this.loggingService.debug(responseLog, controller.name);
        return response;
      }),
    );
  }
}
