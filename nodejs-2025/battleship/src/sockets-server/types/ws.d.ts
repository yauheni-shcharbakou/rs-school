import { WebSocket as BaseWebSocket } from 'ws';
import { User } from '../modules';

declare module 'ws' {
  interface WebSocket extends BaseWebSocket {
    user?: User;
  }
}
