import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

export const userController = new UserController(
  new UserService(new UserRepository()),
);

export * from './user.model';
export { UserService, UserController, UserRepository };
