import cluster, { Worker } from 'cluster';
import { PORT } from './constants';
import { handleException } from './exceptions';
import { availableParallelism, cpus } from 'os';
import { request, createServer } from 'http';
import { createApp } from './main';

const startPrimaryWorker = () => {
  try {
    const startPort = PORT;
    const cpuCount = availableParallelism?.() ?? cpus().length;
    const workers: Worker[] = [];

    const workerPorts = Array.from({ length: cpuCount - 1 }, (_, index) => {
      const workerPort = startPort + index + 1;
      workers.push(cluster.fork({ WORKER_PORT: workerPort }));
      return workerPort;
    });

    workers.forEach((emitter) => {
      emitter.on('message', (message) => {
        workers.forEach((subscriber) => subscriber.send(message));
      });
    });

    const server = createServer();
    let workerIndex = 0;

    server.on('request', (req, res) => {
      const workerPort = workerPorts[workerIndex];
      workerIndex = (workerIndex + 1) % workerPorts.length;

      const proxyRequest = request({
        hostname: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      });

      proxyRequest.on('response', (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      proxyRequest.on('error', (errorRes) => handleException(errorRes, res));
      req.pipe(proxyRequest, { end: true });
    });

    server.listen(startPort, () => {
      console.log(`Load balancer running on http://localhost:${startPort}`);
    });

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.id} failed, restarting...`);
      const port = workerPorts.pop() || startPort + cpuCount;
      workerPorts.push(port);
    });
  } catch (error) {
    console.error(`Cluster failed: ${error}`);
    process.exit(1);
  }
};

export const startWorker = () => {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Worker ${PORT} running on http://localhost:${PORT}`);
  });
};

cluster.isPrimary ? startPrimaryWorker() : startWorker();
