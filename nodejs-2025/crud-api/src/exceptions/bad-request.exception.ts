import { HttpStatus } from '../enums';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(message = 'Bad request') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
