import { getUsernameFromArgs } from './utils/getUsernameFromArgs.js';
import { createInterface } from 'readline';
import os from 'os';
import path from 'path';
import { readdir } from 'fs/promises';
import { readFile } from './utils/readFile.js';
import { createFile } from './utils/createFile.js';
import { rename, unlink, copyFile } from 'node:fs/promises';
import { calcHash } from './utils/calcHash.js';
import { compress } from './utils/compress.js';
import { decompress } from './utils/decompress.js';
import { INVALID_INPUT_ERROR, OPERATION_FAILED_ERROR } from './const.js';
import { getExistedFullPath, getFullPath } from './utils/pathUtils.js';

const rl = createInterface(process.stdin, process.stdout);

let currentDir = os.homedir();
const args = process.argv.slice(2);
const username = getUsernameFromArgs(args);

console.log(`Welcome to the File Manager${username ? ', ' + username : ''}!`);
printCurrentDir();

rl.on('line', (i) => {
  const input = i.trim();

  processCommand(input).finally(printCurrentDir);
});
rl.on('close', finishProcess);
rl.on('SIGINT', finishProcess);

async function processCommand(input) {
  try {
    if (input === '.exit') {
      return finishProcess();
    }
    const args = input.split(' ');
    if (input === 'up') {
      currentDir = path.dirname(currentDir);
    } else if (input.startsWith('cd')) {
      currentDir = await getExistedFullPath(currentDir, args[1]);
    } else if (input === 'ls') {
      const dirents = await readdir(currentDir, { withFileTypes: true });
      console.table(
        dirents.map((d) => ({
          Name: d.name,
          Type: d.isDirectory() ? 'directory' : 'file',
        }))
      );
    } else if (input.startsWith('cat')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      await readFile(filePath);
    } else if (input.startsWith('add')) {
      const filePath = await getFullPath(currentDir, args[1]);
      await createFile(path.resolve(currentDir, filePath));
    } else if (input.startsWith('rn')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      const newFilePath = await getFullPath(currentDir, args[2]);
      await rename(filePath, newFilePath);
    } else if (input.startsWith('cp')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      const newFilePath = await getFullPath(currentDir, args[2]);
      await copyFile(filePath, newFilePath);
    } else if (input.startsWith('rm')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      await unlink(filePath);
    } else if (input.startsWith('hash')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      const hash = await calcHash(filePath);
      console.log('SHA256 hash:\n' + hash);
    } else if (input.startsWith('compress')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      const filePathDest = await getFullPath(currentDir, args[2]);
      await compress(filePath, filePathDest);
    } else if (input.startsWith('decompress')) {
      const filePath = await getExistedFullPath(currentDir, args[1]);
      const filePathDest = await getFullPath(currentDir, args[2]);
      await decompress(filePath, filePathDest);
    } else if (input.startsWith('os')) {
      const command = args[1];
      switch (command) {
        case '--EOL': {
          console.log(JSON.stringify(os.EOL).slice(1, -1));
          break;
        }
        case '--cpus': {
          console.table(
            os.cpus().map((cpu) => ({ model: cpu.model, speed: cpu.speed }))
          );
          break;
        }
        case '--homedir': {
          console.log(os.homedir());
          break;
        }
        case '--username': {
          console.log(os.userInfo().username);
          break;
        }
        case '--architecture': {
          console.log(os.arch());
          break;
        }
        default:
          throw INVALID_INPUT_ERROR;
      }
    } else {
      throw INVALID_INPUT_ERROR;
    }
  } catch (e) {
    if (e.toString() === INVALID_INPUT_ERROR) {
      console.log(e.toString());
    } else {
      console.error(e, OPERATION_FAILED_ERROR);
    }
  }
}
function printCurrentDir() {
  console.log('You are currently in ' + currentDir);
}
function finishProcess() {
  console.log(
    `Thank you for using File Manager${username ? ', ' + username : ''}, goodbye!`
  );
  process.exit();
}
