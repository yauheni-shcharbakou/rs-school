import { Command } from '../../command';
import { RoomService } from '../room';
import { SocketClient } from '../../utils';
import { UserService } from './user.service';
import { IUserLoginData } from './user.types';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  login(socketClient: SocketClient<IUserLoginData>) {
    const data = socketClient.getData();

    const regResponse = {
      type: Command.REG,
      data: {
        name: data?.name,
        index: '',
        error: false,
        errorText: '',
      },
      id: 0,
    };

    try {
      const user = this.userService.findOneOrCreate(data);

      socketClient.setUser(user);
      regResponse.data.index = user.id;

      socketClient.send(regResponse, {
        type: Command.UPDATE_ROOM,
        data: this.roomService.getAvailableRooms(user.id),
        id: 0,
      });

      socketClient.emitToAll({
        type: Command.UPDATE_WINNERS,
        data: this.userService.getWinsData(),
        id: 0,
      });
    } catch (error) {
      regResponse.data.error = true;
      regResponse.data.errorText = (error as Error)?.message ?? 'unknown error';
      socketClient.send(regResponse);
    }
  }
}
