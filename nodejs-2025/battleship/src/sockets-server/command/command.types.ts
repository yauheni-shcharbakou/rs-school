import { Command } from './command.enums';

export interface CommandRequest {
  type: Command;
  data?: any;
  id: number;
}
