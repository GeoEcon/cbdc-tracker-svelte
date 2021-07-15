import { readable, writable } from 'svelte/store';

import { loadJson } from '../utils/load';

const definitionsPath = 'data/definitions.json';

export const definitions = readable([], async set => {
  const data = await loadJson(definitionsPath);
  set(data);
});

export const tooltip = writable(null);
