export const getUsernameFromArg = (arg) => {
  if (!arg) return '';
  const array = arg.split('=');
  if (!array[1]) return '';
  return array[1];
};
