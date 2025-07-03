import { NotFoundException } from '../src/exceptions';
import { v4 } from 'uuid';
import { UserCreate, UserService, UserRepository } from '../src/user';

describe('UserService', () => {
  let userService: UserService;

  const createData: UserCreate = {
    username: 'test',
    age: 10,
    hobbies: ['sport', 'music'],
  };

  const updateData: UserCreate = {
    username: 'updated',
    age: 20,
    hobbies: [],
  };

  const incorrectId = v4();

  beforeEach(() => {
    userService = new UserService(new UserRepository());
  });

  test('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userService).toBeInstanceOf(UserService);
  });

  test('should have empty users array by default', () => {
    expect(userService.getMany).toBeDefined();
    expect(userService.getMany()).toStrictEqual([]);
  });

  test('should create user', () => {
    expect(userService.create).toBeDefined();

    const createdUser = userService.create(createData);

    expect(createdUser).toBeDefined();
    expect({
      username: createdUser.username,
      age: createdUser.age,
      hobbies: createdUser.hobbies,
    }).toStrictEqual(createData);
    expect(userService.getMany()).toStrictEqual([createdUser]);
  });

  test('should return user by id', () => {
    expect(userService.create).toBeDefined();
    expect(userService.getById).toBeDefined();

    const createdUser = userService.create(createData);

    expect(userService.getById(createdUser.id)).toStrictEqual(createdUser);
  });

  test('should throw not found exception if user is not exists', () => {
    expect(userService.getById).toBeDefined();
    const getUserCallback = () => userService.getById(incorrectId);

    expect(getUserCallback).toThrow(NotFoundException);
    expect(getUserCallback).toThrow('User not found');
  });

  test('should update user by id', () => {
    expect(userService.create).toBeDefined();
    expect(userService.updateById).toBeDefined();

    const createdUser = userService.create(createData);
    const updatedUser = userService.updateById(createdUser.id, updateData);

    expect(updatedUser).toStrictEqual({ id: createdUser.id, ...updateData });
  });

  test('should throw not found exception if updated user is not exists', () => {
    expect(userService.updateById).toBeDefined();

    const updateUserCallback = () =>
      userService.updateById(incorrectId, updateData);

    expect(updateUserCallback).toThrow(NotFoundException);
    expect(updateUserCallback).toThrow('User not found');
  });

  test('should delete user by id', () => {
    expect(userService.create).toBeDefined();
    expect(userService.deleteById).toBeDefined();
    expect(userService.getMany).toBeDefined();

    const createdUser = userService.create(createData);
    expect(userService.getMany()).toStrictEqual([createdUser]);

    userService.deleteById(createdUser.id);
    expect(userService.getMany()).toStrictEqual([]);
  });

  test('should throw not found exception if deleted user is not exists', () => {
    expect(userService.deleteById).toBeDefined();
    expect(userService.getMany).toBeDefined();

    const deleteUserCallback = () => userService.deleteById(incorrectId);

    expect(deleteUserCallback).toThrow(NotFoundException);
    expect(deleteUserCallback).toThrow('User not found');
  });
});
