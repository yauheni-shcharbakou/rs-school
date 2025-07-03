import { Command } from '../command';
import { SocketClient } from '../utils';
import { GameController, GameService } from './game';
import { RoomController, RoomService } from './room';
import { UserController, UserService } from './user';

const userService = new UserService();
const gameService = new GameService();
const roomService = new RoomService();
const gameController = new GameController(gameService, userService);
const roomController = new RoomController(roomService, gameService);
const userController = new UserController(userService, roomService);

export const router: Partial<
  Record<Command, (socketClient: SocketClient) => void>
> = {
  [Command.REG]: userController.login.bind(userController),
  [Command.CREATE_ROOM]: roomController.create.bind(roomController),
  [Command.ADD_USER_TO_ROOM]: roomController.addToRoom.bind(roomController),
  [Command.ADD_SHIPS]: gameController.addShips.bind(gameController),
  [Command.ATTACK]: gameController.attack.bind(gameController),
  [Command.RANDOM_ATTACK]: gameController.randomAttack.bind(gameController),
};

export * from './user/user.model';
