import { parentPort } from 'worker_threads';

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on('message', (n) => {
    try {
      const result = nthFibonacci(n);
      parentPort.postMessage(result);
    } catch (error) {
      parentPort.postMessage(null);
    }
  });
};

sendResult();
