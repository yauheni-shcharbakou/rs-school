import { PORT } from '../constants';
import { HttpStatus } from '../enums';
import { BaseException } from './base.exception';
import { ServerResponse } from 'http';

export const handleException = (exception: unknown, res: ServerResponse) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  let exceptionResponse = {
    statusCode,
    message: 'Unknown error',
  };

  if (exception instanceof BaseException) {
    exceptionResponse = exception.toJSON();
    statusCode = exception.getStatusCode();
  }

  console.error(`[${PORT}][ERROR][${statusCode}] ${exceptionResponse.message}`);
  res.writeHead(statusCode).end(JSON.stringify(exceptionResponse));
};
