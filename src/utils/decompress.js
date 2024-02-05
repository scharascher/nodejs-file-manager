import { createWriteStream, createReadStream } from 'fs';
import zlib from 'zlib';

export const decompress = async (path, dest) => {
  return new Promise((resolve, reject) => {
    const brotliDecompress = zlib.createBrotliDecompress();
    const input = createReadStream(path);
    const output = createWriteStream(dest);
    output.on('error', (error) => {
      reject(error.stack);
    });
    output.on('finish', () => {
      resolve();
    });
    input.pipe(brotliDecompress).pipe(output);
  });
};
