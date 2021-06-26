const statusColors = [
  '#95D69A',
  '#61D8D6',
  '#AAC8FC',
  '#F1B2EE',
  '#FFB3B5',
  '#DAC584',
];

export const statusLevels = [
  {
    id: 0,
    name: 'Research',
  },
  {
    id: 1,
    name: 'Development',
  },
  {
    id: 2,
    name: 'Pilot',
  },
  {
    id: 3,
    name: 'Launched',
  },
  {
    id: 4,
    name: 'Cancelled',
  },
  {
    id: 5,
    name: 'Inactive',
  },
];

export const statusColorScale = (function () {
  return statusLevels.reduce(
    (acc, cur, i) => ({ ...acc, [cur.name]: statusColors[i] }),
    {}
  );
})();