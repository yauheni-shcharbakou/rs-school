import { BadRequestException } from '../src/exceptions';
import { HttpStatus } from '../src/enums';
import { ServerResponse } from 'http';
import {
  UserController,
  UserCreate,
  UserRepository,
  UserService,
} from '../src/user';

const validId = 'd03117d6-35dd-46dd-9c91-960dc371b8a7';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: () => validId,
}));

describe('UserController', () => {
  let serverResponse: ServerResponse;
  let userController: UserController;

  let writeHeadSpy: jest.SpyInstance;
  let endSpy: jest.SpyInstance;

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

  const incorrectId = '123';

  beforeEach(() => {
    serverResponse = {
      writeHead: jest.fn(() => serverResponse),
      end: jest.fn(),
    } as unknown as ServerResponse;

    userController = new UserController(new UserService(new UserRepository()));

    writeHeadSpy = jest.spyOn(serverResponse, 'writeHead');
    endSpy = jest.spyOn(serverResponse, 'end');
  });

  beforeAll(() => {});

  afterAll(() => {
    jest.clearAllMocks();
    jest.unmock('uuid');
  });

  test('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userController).toBeInstanceOf(UserController);
  });

  test('should return empty users array by default', () => {
    expect(userController.getMany).toBeDefined();
    userController.getMany(serverResponse);

    expect(writeHeadSpy).toHaveBeenCalledWith(HttpStatus.OK);
    expect(endSpy).toHaveBeenCalledWith(JSON.stringify([]));
  });

  test('should create user', () => {
    expect(userController.create).toBeDefined();
    userController.create(createData, serverResponse);

    expect(writeHeadSpy).toHaveBeenCalledWith(HttpStatus.CREATED);

    expect(endSpy).toHaveBeenCalledWith(
      JSON.stringify({ ...createData, id: validId }),
    );
  });

  test('should throw exception if create data invalid', () => {
    expect(userController.create).toBeDefined();

    const invalidAgeCallback = () =>
      userController.create({ ...createData, age: -2 }, serverResponse);

    expect(invalidAgeCallback).toThrow(BadRequestException);
    expect(invalidAgeCallback).toThrow(
      'Required field age must be not empty and positive number',
    );

    const invalidUsernameCallback = () =>
      userController.create({ ...createData, username: '' }, serverResponse);

    expect(invalidUsernameCallback).toThrow(BadRequestException);
    expect(invalidUsernameCallback).toThrow(
      'Required field username must be not empty and string',
    );

    const invalidHobbiesCallback = () =>
      userController.create(
        { ...createData, hobbies: true } as unknown as UserCreate,
        serverResponse,
      );

    expect(invalidHobbiesCallback).toThrow(BadRequestException);
    expect(invalidHobbiesCallback).toThrow(
      'Required field hobbies must be a string array',
    );
  });

  test('should update user', () => {
    expect(userController.create).toBeDefined();
    expect(userController.updateById).toBeDefined();

    userController.create(createData, serverResponse);
    userController.updateById(validId, updateData, serverResponse);

    expect(writeHeadSpy).toHaveBeenCalledWith(HttpStatus.OK);

    expect(endSpy).toHaveBeenCalledWith(
      JSON.stringify({ ...updateData, id: validId }),
    );
  });

  test('should throw bad request exception if id invalid', () => {
    expect(userController.getById).toBeDefined();
    expect(userController.updateById).toBeDefined();
    expect(userController.deleteById).toBeDefined();

    const callbacks = [
      () => userController.getById(incorrectId, serverResponse),
      () => userController.updateById(incorrectId, updateData, serverResponse),
      () => userController.deleteById(incorrectId, serverResponse),
    ];

    callbacks.forEach((callback) => {
      expect(callback).toThrow(BadRequestException);
      expect(callback).toThrow('Invalid user id');
    });
  });

  test('should delete user by id', () => {
    expect(userController.deleteById).toBeDefined();

    userController.create(createData, serverResponse);
    userController.deleteById(validId, serverResponse);

    expect(writeHeadSpy).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    expect(endSpy).toHaveBeenCalled();
  });
});
