import { Room } from '../room';
import { Game } from './game.model';
import {
  IGameAddShips,
  IGameAttackRequest,
  IGameAttackResponse,
} from './game.types';

export class GameService {
  private readonly gameById: Map<string, Game> = new Map();

  create(room: Room): Game {
    const game = new Game(room);
    this.gameById.set(game.id, game);
    return game;
  }

  addShips(data: IGameAddShips): Game {
    const game = this.getById(data.gameId);

    data.ships.forEach((ship, index) =>
      game.addShipToBoard(data.indexPlayer, ship, index),
    );

    return game;
  }

  attack(game: Game, data: IGameAttackRequest): IGameAttackResponse[] {
    return game.attackPosition(data.indexPlayer, data.x, data.y);
  }

  getById(id: string): Game {
    const game = this.gameById.get(id);

    if (!game) {
      throw new Error('Game not found');
    }

    return game;
  }

  generateRandomPosition(
    game: Game,
    attacker: string,
  ): { x: number; y: number } {
    let x = 0;
    let y = 0;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (game.hasTurn(attacker, `${x}-${y}`));

    return { x, y };
  }
}
