import { randomUUID } from 'crypto';
import { IUserLoginData, IUserPublic, IUserWinData } from './user.types';

export class User {
  public readonly id = randomUUID();
  public readonly name: string;
  private readonly password: string;
  private wins = 0;

  constructor(data: IUserLoginData) {
    this.name = data.name;
    this.password = data.password;
  }

  getWinData(): IUserWinData {
    return {
      name: this.name,
      wins: this.wins,
    };
  }

  verifyPassword(password: string): boolean {
    return this.password === password;
  }

  incWins(): void {
    this.wins += 1;
  }

  toJSON(): IUserPublic {
    return {
      id: this.id,
      name: this.name,
      wins: this.wins,
    };
  }
}
