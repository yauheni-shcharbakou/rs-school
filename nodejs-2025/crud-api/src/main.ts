import { createServer } from 'http';
import { handleRequest } from './router';
import { NODE_ENV, PORT, WORKERS_ENABLED } from './constants';

export const createApp = () => createServer().on('request', handleRequest);

export const bootstrap = () => {
  createApp().listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`),
  );
};

if (NODE_ENV !== 'test' && !WORKERS_ENABLED) {
  bootstrap();
}
