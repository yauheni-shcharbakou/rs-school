import { cpus, EOL, homedir, userInfo } from 'os';

export const os = async (args, _) => {
  const [firstArg] = args;

  switch (firstArg) {
    case '--EOL': {
      console.log(JSON.stringify(EOL));
      break;
    }
    case '--cpus': {
      const items = cpus();
      console.log(`Overall CPUs: ${items.length}`);

      const cpuData = items.map((cpu, index) => {
        const clockRate = (cpu.speed / 1000).toFixed(2);

        return {
          CPU: index + 1,
          Model: cpu.model,
          'Clock rate': `${clockRate} GHz`,
        };
      });

      console.table(cpuData);
      break;
    }
    case '--homedir': {
      console.log(homedir());
      break;
    }
    case '--username': {
      console.log(userInfo().homedir);
      break;
    }
    case '--architecture': {
      console.log(process.arch);
      break;
    }
    default: {
      console.log('Invalid input');
      break;
    }
  }
};
