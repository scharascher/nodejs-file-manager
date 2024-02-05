export const getUsernameFromArgs = (args) => {
  const arg = args.find((a) => a.startsWith('--username'));
  if (!arg) return '';
  const array = arg.split('=');
  if (!array[1]) return '';
  return array[1];
};
