import { cpus } from 'os';
import { join } from 'path';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
  const workerPath = join(import.meta.dirname, 'worker.js');
  const cpusNumber = cpus().length;

  const workers = Array.from({ length: cpusNumber }, (_, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const message = 10 + index;

      worker.postMessage(message);

      worker
        .on('message', (result) => {
          worker.terminate();
          resolve({
            status: typeof result === 'number' ? 'resolved' : 'error',
            data: result,
          });
        })
        .on('error', () => {
          worker.terminate();
          resolve({ status: 'error', data: null });
        });
    });
  });

  const results = await Promise.all(workers);
  console.log(results);
};

await performCalculations();
