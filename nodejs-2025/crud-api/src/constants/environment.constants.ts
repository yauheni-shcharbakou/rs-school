import { config } from 'dotenv';

config();

export const PORT = +(process.env.WORKER_PORT ?? process.env.PORT ?? 4000);
export const NODE_ENV = process.env.NODE_ENV ?? '';
export const WORKERS_ENABLED = process.env.WORKERS_ENABLED === 'true';
