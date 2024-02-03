import { getUsernameFromArg } from './utils/getUsername.js';

const username = getUsernameFromArg(process.argv.slice(2)[0]);
console.log(`Welcome to the File Manager${username ? ', ' + username : ''}`);
