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

export const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();
  const { width, height } = box;

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top  = box.top +  scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { y: Math.round(top), x: Math.round(left), width, height };
};