import { Command } from '../../command';
import { GameService } from '../game';
import { SocketClient } from '../../utils';
import { RoomService } from './room.service';
import { IRoomAddUserData } from './room.types';

export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly gameService: GameService,
  ) {}

  create(socketClient: SocketClient) {
    const user = socketClient.getUser();

    if (this.roomService.isPartOfRoom(user.id)) {
      return;
    }

    this.roomService.create(user);

    socketClient.emitToAll((userId) => {
      return {
        type: Command.UPDATE_ROOM,
        data: this.roomService.getAvailableRooms(userId),
        id: 0,
      };
    });
  }

  addToRoom(socketClient: SocketClient<IRoomAddUserData>) {
    const data = socketClient.getData();
    const user = socketClient.getUser();
    const room = this.roomService.addToRoom(data.indexRoom, user);

    if (room.canStartGame()) {
      const game = this.gameService.create(room);

      socketClient.emit(
        room.getUsers().map((user) => user.id),
        (userId) => {
          return {
            type: Command.CREATE_GAME,
            data: {
              idGame: game.id,
              idPlayer: game.getPlayer(userId),
            },
            id: 0,
          };
        },
      );

      this.roomService.deleteById(room.id);
    }

    socketClient.emitToAll((userId) => {
      return {
        type: Command.UPDATE_ROOM,
        data: this.roomService.getAvailableRooms(userId),
        id: 0,
      };
    });
  }
}
