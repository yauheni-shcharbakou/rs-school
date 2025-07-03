import { v4 } from 'uuid';
import { UserRepository } from './user.repository';
import { NotFoundException } from '../exceptions';
import { User, UserCreate } from './user.model';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getMany(): User[] {
    return this.userRepository.getMany();
  }

  getById(id: string): User {
    const user = this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createData: UserCreate): User {
    const user: User = {
      ...createData,
      id: v4(),
    };

    return this.userRepository.save(user);
  }

  updateById(id: string, updateData: UserCreate): User {
    const user = this.userRepository.updateById(id, updateData);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  deleteById(id: string): void {
    const userId = this.userRepository.deleteById(id);

    if (!userId) {
      throw new NotFoundException('User not found');
    }
  }
}
