import { UserCreate } from './user.model';
import { BadRequestException } from '../exceptions';
import { validate } from 'uuid';
import { HttpStatus } from '../enums';
import { ServerResponse } from 'http';
import { UserService } from './user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  private validateId(id?: string): string {
    if (!id || !validate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    return id;
  }

  private validateBody(body?: Partial<UserCreate>): UserCreate {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Invalid body');
    }

    if (!body.age || typeof body.age !== 'number' || body.age <= 0) {
      throw new BadRequestException(
        'Required field age must be not empty and positive number',
      );
    }

    if (!body.username || typeof body.username !== 'string') {
      throw new BadRequestException(
        'Required field username must be not empty and string',
      );
    }

    if (
      !body.hobbies ||
      !Array.isArray(body.hobbies) ||
      body.hobbies.some((hobby) => typeof hobby !== 'string')
    ) {
      throw new BadRequestException(
        'Required field hobbies must be a string array',
      );
    }

    return {
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };
  }

  getMany(res: ServerResponse) {
    const users = this.userService.getMany();
    res.writeHead(HttpStatus.OK).end(JSON.stringify(users));
  }

  getById(id: string, res: ServerResponse) {
    const userId = this.validateId(id);
    const user = this.userService.getById(userId);

    res.writeHead(HttpStatus.OK).end(JSON.stringify(user));
  }

  create(createData: Partial<UserCreate>, res: ServerResponse) {
    const validatedBody = this.validateBody(createData);
    const user = this.userService.create(validatedBody);

    res.writeHead(HttpStatus.CREATED).end(JSON.stringify(user));
  }

  updateById(id: string, updateData: Partial<UserCreate>, res: ServerResponse) {
    const userId = this.validateId(id);
    const validatedBody = this.validateBody(updateData);
    const user = this.userService.updateById(userId, validatedBody);

    res.writeHead(HttpStatus.OK).end(JSON.stringify(user));
  }

  deleteById(id: string, res: ServerResponse) {
    const userId = this.validateId(id);
    this.userService.deleteById(userId);

    res.writeHead(HttpStatus.NO_CONTENT).end();
  }
}
