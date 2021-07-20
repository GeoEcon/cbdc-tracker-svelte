import { writable, derived } from 'svelte/store';

import { dataCountries } from './datacountries';

const removeTimeOut = 200;

const generateIdArrayStore = () => {
  const { set, update, subscribe } = writable([]);

  let toBeRemoved = {};

  const add = (id) => {
    update(store => {
      if (store.includes(id)) return store;
      return [...store, id];
    });
    clearTimeout(toBeRemoved[`id_${id}`]);
  };

  const remove = (id) => {
    const timeOutId = setTimeout(() => {
      update(store => store.filter(d => d !== id));
    }, removeTimeOut);
    toBeRemoved = {...toBeRemoved, [`id_${id}`]: timeOutId};
  };

  return {
    set,
    subscribe,
    add,
    remove
  };
};

export const hoveredIds = generateIdArrayStore();
export const selectedId = writable();

export const selectedDatum = derived([dataCountries, selectedId], ([$dataCountries, $selectedId]) => {
  if ($selectedId === null) return null;
  const datum = $dataCountries.find(d => d.id === $selectedId);
  if (!datum) return null;
  return datum;
}, null);

export const applySelected = (urlParams) => {
  if (!urlParams) return;
  const selected = urlParams.get('selected');
  if (!selected) return;
  selectedId.set(+selected);
};