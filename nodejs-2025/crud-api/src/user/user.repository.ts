import { EmitToWorkers, SubscribeToWorkers } from '../decorators';
import { User, UserCreate } from './user.model';

@SubscribeToWorkers()
export class UserRepository {
  private users: User[] = [];

  getMany(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  @EmitToWorkers()
  save(user: User): User {
    this.users.push(user);
    return user;
  }

  @EmitToWorkers()
  updateById(id: string, updateData: UserCreate): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1 || !this.users[index]) {
      return;
    }

    const updatedUser = this.users[index];
    const updatedFields = ['hobbies', 'age', 'username'] as const;

    updatedFields.forEach((field) => {
      const value = updateData[field];

      if (value) {
        Object.defineProperty(updatedUser, field, { writable: true, value });
      }
    });

    return updatedUser;
  }

  @EmitToWorkers()
  deleteById(id: string): string | undefined {
    const usersCount = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);

    if (usersCount === this.users.length) {
      return;
    }

    return id;
  }
}
