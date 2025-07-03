import { PORT } from './constants';
import { basename } from 'path';
import { userController, UserCreate } from './user';
import { HttpMethod } from './enums';
import {
  BadRequestException,
  handleException,
  NotFoundException,
} from './exceptions';
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

export const parseBody = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new BadRequestException('Invalid body'));
      }
    });
  });
};

export const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    console.log(`[${PORT}][${req.method}] ${req.url}`);

    const url = new URL(req.url ?? '', 'http://localhost');
    res.setHeader('Content-Type', 'application/json');

    if (url.pathname === '/api/users') {
      switch (req.method) {
        case HttpMethod.GET: {
          return userController.getMany(res);
        }
        case HttpMethod.POST: {
          const userData: Partial<UserCreate> = await parseBody(req);
          return userController.create(userData, res);
        }
        default: {
          break;
        }
      }
    }

    if (/^\/api\/users\/([\w\d-]+)$/g.test(url.pathname)) {
      const userId = basename(url.pathname);

      switch (req.method) {
        case HttpMethod.GET: {
          return userController.getById(userId, res);
        }
        case HttpMethod.PUT: {
          const updateData: Partial<UserCreate> = await parseBody(req);
          return userController.updateById(userId, updateData, res);
        }
        case HttpMethod.DELETE: {
          return userController.deleteById(userId, res);
        }
        default: {
          break;
        }
      }
    }

    throw new NotFoundException('Endpoint not found');
  } catch (error) {
    handleException(error, res);
  }
};
