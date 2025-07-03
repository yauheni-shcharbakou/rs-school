import { User } from './user.model';
import { IUserLoginData, IUserWinData } from './user.types';

export class UserService {
  private readonly users: User[] = [];

  findOneOrCreate(data: IUserLoginData): User {
    let user: User | undefined = this.users.find(
      (user) => user.name === data.name,
    );

    if (!user) {
      user = new User(data);
      this.users.push(user);
      return user;
    }

    if (!user.verifyPassword(data.password)) {
      throw new Error('Invalid password');
    }

    return user;
  }

  getWinsData(): IUserWinData[] {
    return this.users.map((user) => user.getWinData());
  }

  addVictory(id: string): User {
    const user: User | undefined = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    user.incWins();
    return user;
  }
}
