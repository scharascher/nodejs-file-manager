import { createReadStream } from 'node:fs';
export const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('end', () => {
      process.stdout.write('\n');
    });
    stream.on('error', reject);
  });
};
