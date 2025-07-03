import { config } from 'dotenv';
import { httpServer } from './src/http-server';
import { startSocketServer } from './src/sockets-server';

config();

const HTTP_PORT = +(process.env.PORT ?? 8181);
const WEBSOCKET_PORT = +(process.env.WEBSOCKET_PORT ?? 3000);

console.log(`Start static http server at http://localhost:${HTTP_PORT}`);
httpServer.listen(HTTP_PORT);

console.log(`Start websocket server at ws://localhost:${WEBSOCKET_PORT}`);
startSocketServer(WEBSOCKET_PORT);
