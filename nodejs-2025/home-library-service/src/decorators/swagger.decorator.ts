import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ExceptionResponseDto } from '../dto/exception.response.dto';

const decoratorByStatusCode = new Map([
  [
    HttpStatus.NOT_FOUND,
    (entityName: string) =>
      ApiNotFoundResponse({
        description: `${entityName} not found`,
        type: ExceptionResponseDto,
      }),
  ],
  [
    HttpStatus.FORBIDDEN,
    () =>
      ApiForbiddenResponse({
        description: 'Forbidden',
        type: ExceptionResponseDto,
      }),
  ],
  [
    HttpStatus.BAD_REQUEST,
    () =>
      ApiBadRequestResponse({
        description: 'Bad request',
        type: ExceptionResponseDto,
      }),
  ],
  [
    HttpStatus.UNPROCESSABLE_ENTITY,
    (entityName: string) =>
      ApiUnprocessableEntityResponse({
        description: `${entityName} not found`,
        type: ExceptionResponseDto,
      }),
  ],
  [
    HttpStatus.UNAUTHORIZED,
    () =>
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ExceptionResponseDto,
      }),
  ],
]);

type ApiExceptionsParams = {
  entityName?: string;
  statusCodes: HttpStatus[];
};

export const ApiExceptions = (params: ApiExceptionsParams) => {
  const entityName = params.entityName || 'Entity';

  return applyDecorators(
    ...params.statusCodes.map((statusCode) =>
      decoratorByStatusCode.get(statusCode)(entityName),
    ),
  );
};
