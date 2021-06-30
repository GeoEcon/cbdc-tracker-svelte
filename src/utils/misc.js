export const sortToEnd = (arr, col = 'name', value = 'n/a') => {
  const endItem = arr.find(d => d[col] === value);
  if (!endItem) return arr;
  return [...arr.filter(d => d[col] !== value), endItem];
};