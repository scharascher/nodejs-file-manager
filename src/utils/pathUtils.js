import { exists } from './exists.js';
import { INVALID_INPUT_ERROR } from '../const.js';
import { resolve } from 'path';

export const getExistedFullPath = async (currentDir, path) => {
  try {
    if (!path) throw INVALID_INPUT_ERROR;
    const fullPath = resolve(currentDir, path);
    if (await exists(fullPath)) {
      return fullPath;
    } else throw INVALID_INPUT_ERROR;
  } catch (e) {
    throw INVALID_INPUT_ERROR;
  }
};
export const getFullPath = async (currentDir, path) => {
  if (!path) throw INVALID_INPUT_ERROR;
  return resolve(currentDir, path);
};
