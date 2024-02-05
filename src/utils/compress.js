import { createWriteStream, createReadStream } from 'fs';
import zlib from 'zlib';

export const compress = async (path, dest) => {
  return new Promise((resolve, reject) => {
    const brotli = zlib.createBrotliCompress();
    const input = createReadStream(path);
    const output = createWriteStream(dest);
    output.on('error', (error) => {
      reject(error.stack);
    });
    output.on('finish', () => {
      resolve();
    });
    input.pipe(brotli).pipe(output);
  });
};
