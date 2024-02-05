import { access } from 'fs/promises';

export async function exists(path, arg) {
  try {
    await access(path, arg);
    return true;
  } catch {
    return false;
  }
}
