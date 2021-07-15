export const sortToEnd = (arr, col = 'name', value = 'Undecided') => {
  const endItem = arr.find(d => d[col] === value);
  if (!endItem) return arr;
  return [...arr.filter(d => d[col] !== value), endItem];
};

export const extractHostname = (url) => {
  let hostname = url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  hostname = hostname.replace(/^www\./i, '');
  return hostname;
};