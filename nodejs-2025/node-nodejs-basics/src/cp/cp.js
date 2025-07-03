import { spawn } from 'child_process';
import { join } from 'path';

const spawnChildProcess = async (args) => {
  const scriptPath = join(import.meta.dirname, 'files', 'script.js');
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
