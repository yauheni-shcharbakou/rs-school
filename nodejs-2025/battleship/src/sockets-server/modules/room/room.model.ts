import { randomUUID } from 'crypto';
import { User } from '../user';
import { IRoomAvailableData } from './room.types';

export class Room {
  public readonly id = randomUUID();
  private readonly users: User[] = [];

  constructor(user: User) {
    this.addUser(user);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  isAvailableFor(userId: string): boolean {
    return (
      this.users.length < 2 && this.users.every((user) => user.id !== userId)
    );
  }

  canStartGame(): boolean {
    return this.users.length === 2;
  }

  getUsers(): User[] {
    return this.users;
  }

  toJSON(): IRoomAvailableData {
    return {
      roomId: this.id,
      roomUsers: this.users.map((user) => {
        return {
          name: user.name,
          index: user.id,
        };
      }),
    };
  }
}
