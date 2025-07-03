import { GameShipAttackFeedback, GameShipType } from './game.enums';

export interface IGameShipData {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: GameShipType;
}

export interface IGameAddShips {
  gameId: string;
  ships: IGameShipData[];
  indexPlayer: string;
}

export interface IGameAttackRequest {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
}

export interface IGameAttackResponse {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: string;
  status: GameShipAttackFeedback;
}

export interface IGameRandomAttackRequest {
  gameId: string;
  indexPlayer: string;
}
