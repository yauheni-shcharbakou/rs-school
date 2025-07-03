// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { join } from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('fs', () => {
  return {
    ...jest.requireActual('fs'),
    existsSync: jest.fn(),
  };
});

jest.mock('path', () => {
  return {
    ...jest.requireActual('path'),
    join: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  return {
    ...jest.requireActual('fs/promises'),
    readFile: jest.fn(),
  };
});

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;
  const timeout = 1000;

  beforeEach(() => {
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockRestore();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    expect(doStuffByTimeout).toBeDefined();
    expect(() => doStuffByTimeout(callback, timeout)).not.toThrow();
    expect(jest.getTimerCount()).toBe(1);

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    expect(doStuffByTimeout).toBeDefined();
    expect(() => doStuffByTimeout(callback, timeout)).not.toThrow();
    expect(jest.getTimerCount()).toBe(1);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });
});

describe('doStuffByInterval', () => {
  let callback: jest.Mock;
  const timeout = 1000;

  beforeEach(() => {
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockRestore();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    expect(doStuffByInterval).toBeDefined();
    expect(() => doStuffByInterval(callback, timeout)).not.toThrow();
    expect(jest.getTimerCount()).toBe(1);

    expect(setIntervalSpy).toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    expect(doStuffByInterval).toBeDefined();
    expect(() => doStuffByInterval(callback, timeout)).not.toThrow();
    expect(jest.getTimerCount()).toBe(1);
    expect(callback).not.toHaveBeenCalled();

    new Array(5).forEach((_, index) => {
      jest.advanceTimersByTime(timeout);

      expect(callback).toHaveBeenCalledTimes(index + 1);
      expect(jest.getTimerCount()).toBe(1);
    });
  });
});

describe('readFileAsynchronously', () => {
  const path = 'pathToFile';

  test('should call join with pathToFile', async () => {
    expect(readFileAsynchronously).toBeDefined();
    await readFileAsynchronously(path);

    expect(join).toHaveBeenCalled();
    expect(join).toHaveBeenCalledWith(__dirname, path);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(readFileAsynchronously).toBeDefined();
    const result = await readFileAsynchronously(path);

    expect(fs.existsSync).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);

    expect(readFileAsynchronously).toBeDefined();
    const result = await readFileAsynchronously(path);

    expect(fs.existsSync).toHaveBeenCalled();
    expect(fsPromises.readFile).toHaveBeenCalled();
    expect(result).toBe(fileContent);
  });
});
