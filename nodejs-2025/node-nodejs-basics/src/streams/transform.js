import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  class StringTransformer extends Transform {
    _transform(chunk, encoding, callback) {
      callback(null, chunk?.toString().split('').reverse().join(''));
    }
  }

  try {
    await pipeline(process.stdin, new StringTransformer(), process.stdout);
  } catch (error) {
    throw new Error('Stream operation failed');
  }
};

await transform();
