// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne).toBeDefined();
    expect(mockTwo).toBeDefined();
    expect(mockThree).toBeDefined();

    expect(() => mockOne()).not.toThrow();
    expect(() => mockTwo()).not.toThrow();
    expect(() => mockThree()).not.toThrow();

    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    expect(unmockedFunction).toBeDefined();
    expect(() => unmockedFunction()).not.toThrow();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
