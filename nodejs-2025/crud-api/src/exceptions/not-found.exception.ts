import { HttpStatus } from '../enums';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(message = 'Not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
