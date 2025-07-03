import { IEnv } from '../interfaces/env.interface';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnv {}
  }
}

export {};
