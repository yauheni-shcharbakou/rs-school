// Uncomment the code below and write your tests
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((callback) => callback),
}));

describe('throttledGetDataFromApi', () => {
  const requestPath = 'users/1/comments';

  const expectedAxiosParams: CreateAxiosDefaults = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };

  let requestMock: jest.Mock;
  let axiosSpy: jest.SpyInstance;

  beforeEach(() => {
    requestMock = jest.fn((relativePath) =>
      Promise.resolve({ data: relativePath }),
    );

    axiosSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: requestMock } as unknown as AxiosInstance);
  });

  afterEach(() => {
    requestMock.mockRestore();
    axiosSpy.mockRestore();
  });

  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create instance with provided base url', async () => {
    expect(throttledGetDataFromApi).toBeDefined();
    await throttledGetDataFromApi('');

    expect(axiosSpy).toHaveBeenCalled();
    expect(axiosSpy).toHaveBeenCalledWith(expectedAxiosParams);
  });

  test('should perform request to correct provided url', async () => {
    expect(throttledGetDataFromApi).toBeDefined();
    await throttledGetDataFromApi(requestPath);

    expect(axiosSpy).toHaveBeenCalled();
    expect(axiosSpy).toHaveBeenCalledWith(expectedAxiosParams);

    expect(requestMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledWith(requestPath);
  });

  test('should return response data', async () => {
    expect(throttledGetDataFromApi).toBeDefined();
    const response = await throttledGetDataFromApi(requestPath);

    expect(axiosSpy).toHaveBeenCalled();
    expect(axiosSpy).toHaveBeenCalledWith(expectedAxiosParams);

    expect(requestMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledWith(requestPath);

    expect(response).toBeDefined();
    expect(response).toBe(requestPath);
  });
});
