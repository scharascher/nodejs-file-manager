import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const calcHash = async (path) => {
  return new Promise((resolve, reject) =>
    createReadStream(path)
      .pipe(createHash('sha256').setEncoding('hex'))
      .on('finish', function () {
        resolve(this.read());
      })
      .on('error', reject)
  );
};
