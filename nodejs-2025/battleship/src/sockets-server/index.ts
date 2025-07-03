import { RawData, WebSocket, WebSocketServer } from 'ws';
import { router } from './modules';
import { SocketClient } from './utils';

export const startSocketServer = (port: number) => {
  const socketServer = new WebSocketServer({ port });
  const clientByUserId: Map<string, WebSocket> = new Map();

  socketServer.on('connection', (client: WebSocket) => {
    client.on('message', (message: RawData) => {
      try {
        console.log(
          `[REQUEST][${client.user?.id ?? 'unauthorized'}] ${message.toString()}`,
        );

        const socketClient = new SocketClient(
          client,
          clientByUserId,
        ).parseRequest(message);

        const handler = router[socketClient.getType()];

        if (!handler) {
          throw new Error('Invalid request type');
        }

        return handler(socketClient);
      } catch (error) {
        console.log(
          `[ERROR][${client.user?.id}] ${(error as Error)['message']}`,
        );

        client.send(
          JSON.stringify({
            type: 'error',
            data: JSON.stringify({
              message: (error as Error).message ?? 'Unknown error',
            }),
            id: 0,
          }),
        );
      }
    });

    client.on('error', (error) => {
      console.log(`[ERROR][${client.user?.id}] ${(error as Error)['message']}`);
    });

    client.on('close', () => {
      console.log(`[DISCONNECTED] [${client.user?.id}]`);
      clientByUserId.delete(client.user?.id ?? '');
    });
  });

  socketServer.on('error', (error) => {
    console.log(`[ERROR][SERVER] ${(error as Error)['message']}`);
  });

  socketServer.on('close', () => {
    console.log('[SERVER] Closed');
    clientByUserId.forEach((client) => client.close());
    clientByUserId.clear();
  });
};
