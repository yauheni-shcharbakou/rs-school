import { randomUUID } from 'crypto';
import { Room } from '../room';
import { User } from '../user';
import { GameBoardPositionStatus, GameShipAttackFeedback } from './game.enums';
import { IGameAttackResponse, IGameShipData } from './game.types';

export class Game {
  public readonly id = randomUUID();
  private readonly playerByUser = new Map<string, string>();

  private readonly boardByPlayer = new Map<
    string,
    Map<string, GameBoardPositionStatus>
  >();

  private readonly shipsDataByPlayer = new Map<string, IGameShipData[]>();
  private readonly shipsHitByPlayer = new Map<string, Map<number, string[]>>();
  private readonly prevTurnsByPlayer = new Map<string, string[]>();
  private readonly hpByPlayer = new Map<string, number>();

  private currentPlayer: string;
  private readonly users: User[] = [];
  private readonly players: string[] = [];

  constructor(room: Room) {
    this.users = room.getUsers();

    this.users.forEach((user) => {
      const playerId = randomUUID();

      this.players.push(playerId);
      this.playerByUser.set(user.id, playerId);
      this.boardByPlayer.set(playerId, new Map());
      this.shipsHitByPlayer.set(playerId, new Map());
      this.prevTurnsByPlayer.set(playerId, []);
      this.hpByPlayer.set(playerId, 0);
    });

    this.currentPlayer = this.chooseRandomPlayer();
  }

  private chooseRandomPlayer(): string {
    const index = Math.round(Math.random());
    return this.players[index]!;
  }

  canStart(): boolean {
    return this.shipsDataByPlayer.size === 2;
  }

  getWinner(): string | undefined {
    const looser = this.players.find((player) => !this.getHp(player));

    if (!looser) {
      return;
    }

    return this.getEnemy(looser);
  }

  nextTurn(): string {
    this.currentPlayer = this.getEnemy(this.currentPlayer);
    return this.currentPlayer;
  }

  getUsers(): User[] {
    return this.users;
  }

  getEnemy(currentPlayer: string): string {
    const enemy = this.players.find((player) => player !== currentPlayer);

    if (!enemy) {
      throw new Error('Enemy not found');
    }

    return enemy;
  }

  getCurrentPlayer(): string {
    return this.currentPlayer;
  }

  getPlayer(userId: string): string {
    const player = this.playerByUser.get(userId);

    if (!player) {
      throw new Error('Player not found');
    }

    return player;
  }

  getBoard(player: string): Map<string, GameBoardPositionStatus> {
    const board = this.boardByPlayer.get(player);

    if (!board) {
      throw new Error('Board not found');
    }

    return board;
  }

  getDamagedShips(player: string): Map<number, string[]> {
    const damagedShips = this.shipsHitByPlayer.get(player);

    if (!damagedShips) {
      throw new Error('Not found');
    }

    return damagedShips;
  }

  getShipsData(player: string): IGameShipData[] {
    return this.shipsDataByPlayer.get(player) ?? [];
  }

  getHp(player: string): number {
    return this.hpByPlayer.get(player) ?? 0;
  }

  incHp(player: string): void {
    this.hpByPlayer.set(player, this.getHp(player) + 1);
  }

  decHp(player: string): void {
    this.hpByPlayer.set(player, this.getHp(player) - 1);
  }

  addShipToBoard(player: string, ship: IGameShipData, index: number): void {
    const board = this.getBoard(player);
    const damagedShips = this.getDamagedShips(player);
    const shipsData = this.getShipsData(player);

    for (let i = 0; i < ship.length; i += 1) {
      const x = !ship.direction ? ship.position.x + i : ship.position.x;
      const y = !ship.direction ? ship.position.y : ship.position.y + i;
      const key = `${x}-${y}`;

      board.set(key, GameBoardPositionStatus.PLACED);
      damagedShips.set(index, [...(damagedShips.get(index) ?? []), key]);
      this.incHp(player);
    }

    shipsData.push(ship);
    this.shipsDataByPlayer.set(player, shipsData);
  }

  destroyShip(
    enemy: string,
    shipIndex: number,
  ): Omit<IGameAttackResponse, 'currentPlayer'>[] {
    const board = this.getBoard(enemy);
    const shipsData = this.getShipsData(enemy);
    const ship = shipsData[shipIndex];

    if (!ship) {
      throw new Error('Ship not found');
    }

    const responses: Omit<IGameAttackResponse, 'currentPlayer'>[] = [];

    const startX = ship.position.x - 1;
    const startY = ship.position.y - 1;
    const endX = ship.direction ? startX + 2 : startX + ship.length + 1;
    const endY = ship.direction ? startY + ship.length + 1 : startY + 2;

    for (let x = startX; x <= endX; x += 1) {
      for (let y = startY; y <= endY; y += 1) {
        if (x < 0 || y < 0 || x > 9 || y > 9) {
          continue;
        }

        const key = `${x}-${y}`;

        if (x === startX || y === startY || x === endX || y === endY) {
          responses.push({
            position: { x, y },
            status: GameShipAttackFeedback.MISS,
          });

          board.set(key, GameBoardPositionStatus.MISS);
          continue;
        }

        responses.push({
          position: { x, y },
          status: GameShipAttackFeedback.KILLED,
        });

        board.set(key, GameBoardPositionStatus.HIT);
      }
    }

    return responses;
  }

  saveTurn(player: string, key: string): void {
    const prevTurns = this.prevTurnsByPlayer.get(player) ?? [];
    this.prevTurnsByPlayer.set(player, [...prevTurns, key]);
  }

  attackPosition(player: string, x: number, y: number): IGameAttackResponse[] {
    const enemy = this.getEnemy(player);
    const board = this.getBoard(enemy);
    const damagedShips = this.getDamagedShips(enemy);
    const key = `${x}-${y}`;
    const boardPointStatus = board.get(key);

    const responses: IGameAttackResponse[] = [];

    if (
      boardPointStatus === GameBoardPositionStatus.HIT ||
      boardPointStatus === GameBoardPositionStatus.MISS
    ) {
      return responses;
    }

    if (boardPointStatus !== GameBoardPositionStatus.PLACED) {
      board.set(key, GameBoardPositionStatus.MISS);
      this.nextTurn();
      this.saveTurn(player, key);

      responses.push({
        position: { x, y },
        status: GameShipAttackFeedback.MISS,
        currentPlayer: player,
      });

      return responses;
    }

    const damagedShip = Array.from(damagedShips.entries()).find(([, keys]) =>
      keys.includes(key),
    );

    if (!damagedShip) {
      throw new Error('Ship not found');
    }

    if (damagedShip[1].length > 1) {
      damagedShips.set(
        damagedShip[0],
        damagedShip[1].filter((k) => k !== key),
      );

      board.set(key, GameBoardPositionStatus.HIT);
      this.decHp(enemy);
      this.saveTurn(player, key);

      responses.push({
        position: { x, y },
        status: GameShipAttackFeedback.SHOT,
        currentPlayer: player,
      });

      return responses;
    }

    damagedShips.set(
      damagedShip[0],
      damagedShip[1].filter((k) => k !== key),
    );

    board.set(key, GameBoardPositionStatus.HIT);
    this.decHp(enemy);
    this.saveTurn(player, key);

    responses.push(
      ...this.destroyShip(enemy, damagedShip[0]).map((response) => {
        return { ...response, currentPlayer: player };
      }),
    );

    return responses;
  }

  hasTurn(player: string, key: string): boolean {
    const prevTurns = this.prevTurnsByPlayer.get(player) ?? [];
    return prevTurns.includes(key);
  }
}
