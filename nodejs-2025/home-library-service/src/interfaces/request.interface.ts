import { Request } from 'express';

export interface IRequest extends Request {
  controller?: string;
}
