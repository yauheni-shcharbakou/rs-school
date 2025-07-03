import { RawData, WebSocket } from 'ws';
import { Command, CommandRequest } from '../command';
import { User } from '../modules';

export type EmitMessage = ((userId: string) => CommandRequest) | CommandRequest;

export class SocketClient<Data = any> {
  private user?: User;
  private data?: Data;
  private type?: Command;

  constructor(
    private readonly client: WebSocket,
    private readonly clientByUserId: Map<string, WebSocket>,
  ) {
    this.user = client.user;

    if (client.user) {
      this.clientByUserId.set(client.user.id, client);
    }
  }

  private emitMessages(userIds: string[], messagesOrBuilders: EmitMessage[]) {
    userIds.forEach((userId) => {
      const client = this.clientByUserId.get(userId);

      if (!client) {
        return;
      }

      messagesOrBuilders.forEach((messageOrBuilder) => {
        const message =
          typeof messageOrBuilder === 'function'
            ? messageOrBuilder(userId)
            : messageOrBuilder;

        const stringMessage = JSON.stringify({
          ...message,
          data: message.data ? JSON.stringify(message.data) : undefined,
        });

        console.log(`[SEND][${client.user?.id}] ${stringMessage}`);
        client.send(stringMessage);
      });
    });
  }

  parseRequest(request: RawData): typeof this {
    try {
      const result: CommandRequest = JSON.parse(request.toString());
      this.type = result.type;

      if (!result.data) {
        return this;
      }

      this.data = JSON.parse(result.data.toString() ?? '{}');
      return this;
    } catch (error) {
      throw new Error('Invalid request format');
    }
  }

  setUser(user: User): typeof this {
    this.user = user;
    this.client.user = user;
    this.clientByUserId.set(user.id, this.client);
    return this;
  }

  getType(): Command {
    if (!this.type) {
      throw new Error('Incorrect request type');
    }

    return this.type;
  }

  getData(): Data {
    if (!this.data) {
      throw new Error('Data field is empty');
    }

    return this.data;
  }

  getUser(): User {
    if (!this.user) {
      throw new Error('User is missing');
    }

    return this.user;
  }

  send(...responses: CommandRequest[]) {
    responses.forEach((response) => {
      const message = JSON.stringify({
        ...response,
        data: response.data ? JSON.stringify(response.data) : undefined,
      });

      console.log(`[SEND][${this.client.user?.id}] ${message}`);
      this.client.send(message);
    });
  }

  emit(userIds: string[], ...messages: EmitMessage[]) {
    this.emitMessages(userIds, messages);
  }

  emitToAll(...messages: EmitMessage[]) {
    this.emitMessages(Array.from(this.clientByUserId.keys()), messages);
  }
}
