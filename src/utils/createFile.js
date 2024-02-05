import { createWriteStream } from 'node:fs';

export const createFile = async (path) => {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(path);
    stream.on('finish', resolve);
    stream.on('error', reject);
    stream.end();
  });
};
