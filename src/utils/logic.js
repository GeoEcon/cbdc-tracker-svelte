export const getInstance = () => `${(new Date()).getTime() + Math.random()}`.replace('.', '');

export const hasOverlap = (arr, filter) => {
  return filter
    .filter((d) => d.selected)
    .map((d) => d.id)
    .some((item) => arr.includes(item));
};

export const isDefined = (value) => value !== undefined && value !== null;

export const areAllSelected = (arr, property = 'selected') => arr.every(d => d[property]);

export const areAllUnselected = (arr, property = 'selected') => arr.every(d => !d[property]);