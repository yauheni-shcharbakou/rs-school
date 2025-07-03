import { v4 } from 'uuid';
import { UserCreate } from '../src/user';
import { createApp } from '../src/main';
import { HttpStatus } from '../src/enums';
import request = require('supertest');

describe('E2E', () => {
  let server: ReturnType<typeof request>;

  const createData: UserCreate = {
    username: 'test',
    age: 10,
    hobbies: ['sport', 'music'],
  };

  const notFoundId = v4();
  const invalidId = '123';

  beforeEach(() => {
    server = request(createApp());
  });

  test('should throw not found exception on invalid url', async () => {
    const urls = ['/api', `/api/users/${notFoundId}/notes`, '/api/comments'];

    const requests = await Promise.all(urls.map((url) => server.get(url)));

    requests.forEach((response) => {
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.body).toStrictEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Endpoint not found',
      });
    });
  });

  test('should return empty users array by default', async () => {
    const response = await server.get('/api/users');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toStrictEqual([]);
  });

  test('should throw bad request exception if create user body is not provided', async () => {
    const response = await server.post('/api/users');

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid body',
    });
  });

  test('should throw bad request exception if age is invalid', async () => {
    const response = await server.post('/api/users').send({
      ...createData,
      age: -2,
    });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Required field age must be not empty and positive number',
    });
  });

  test('should throw bad request exception if username is invalid', async () => {
    const response = await server.post('/api/users').send({
      ...createData,
      username: [],
    });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Required field username must be not empty and string',
    });
  });

  test('should throw bad request exception if hobbies is invalid', async () => {
    const response = await server.post('/api/users').send({
      ...createData,
      hobbies: true,
    });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Required field hobbies must be a string array',
    });
  });

  test('should throw bad request exception if user id is invalid', async () => {
    const responses = await Promise.all([
      server.get(`/api/users/${invalidId}`),
      server.put(`/api/users/${invalidId}`).send(createData),
      server.delete(`/api/users/${invalidId}`),
    ]);

    responses.forEach((response) => {
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toStrictEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid user id',
      });
    });
  });

  test('should throw not found exception if user is not exists', async () => {
    const responses = await Promise.all([
      server.get(`/api/users/${notFoundId}`),
      server.put(`/api/users/${notFoundId}`).send(createData),
      server.delete(`/api/users/${notFoundId}`),
    ]);

    responses.forEach((response) => {
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.body).toStrictEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });
  });
});
