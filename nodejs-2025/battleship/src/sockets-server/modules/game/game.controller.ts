import { Command } from '../../command';
import { UserService } from '../user';
import { EmitMessage, SocketClient } from '../../utils';
import { Game } from './game.model';
import { GameService } from './game.service';
import {
  IGameAddShips,
  IGameAttackRequest,
  IGameAttackResponse,
  IGameRandomAttackRequest,
} from './game.types';

export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
  ) {}

  private afterAttack(
    socketClient: SocketClient,
    game: Game,
    attackResponses: IGameAttackResponse[],
  ) {
    const messages: EmitMessage[] = [
      ...attackResponses.map((attackResponse) => {
        return {
          type: Command.ATTACK,
          data: attackResponse,
          id: 0,
        };
      }),
      {
        type: Command.TURN,
        data: { currentPlayer: game.getCurrentPlayer() },
        id: 0,
      },
    ];

    const winner = game.getWinner();

    if (winner) {
      const user = socketClient.getUser();
      this.userService.addVictory(user.id);

      messages.push({
        type: Command.FINISH,
        data: { winPlayer: winner },
        id: 0,
      });

      socketClient.emitToAll({
        type: Command.UPDATE_WINNERS,
        data: this.userService.getWinsData(),
        id: 0,
      });
    }

    socketClient.emit(
      game.getUsers().map((user) => user.id),
      ...messages,
    );
  }

  addShips(socketClient: SocketClient<IGameAddShips>) {
    const data = socketClient.getData();
    const game = this.gameService.addShips(data);

    if (game.canStart()) {
      socketClient.emit(
        game.getUsers().map((user) => user.id),
        (userId) => {
          const player = game.getPlayer(userId);

          return {
            type: Command.START_GAME,
            data: game.getShipsData(player),
            id: 0,
          };
        },
        {
          type: Command.TURN,
          data: { currentPlayer: game.getCurrentPlayer() },
          id: 0,
        },
      );
    }
  }

  attack(socketClient: SocketClient<IGameAttackRequest>) {
    const data = socketClient.getData();
    const game = this.gameService.getById(data.gameId);

    if (game.getCurrentPlayer() !== data.indexPlayer) {
      return;
    }

    const attackResponses = this.gameService.attack(game, data);
    this.afterAttack(socketClient, game, attackResponses);
  }

  randomAttack(socketClient: SocketClient<IGameRandomAttackRequest>) {
    const data = socketClient.getData();
    const game = this.gameService.getById(data.gameId);

    if (game.getCurrentPlayer() !== data.indexPlayer) {
      return;
    }

    const position = this.gameService.generateRandomPosition(
      game,
      data.indexPlayer,
    );

    const attackResponses = this.gameService.attack(game, {
      ...position,
      gameId: game.id,
      indexPlayer: data.indexPlayer,
    });

    this.afterAttack(socketClient, game, attackResponses);
  }
}
