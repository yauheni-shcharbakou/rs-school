declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      WORKER_PORT: string;
      WORKERS_ENABLED: string;
    }
  }
}

export {};
