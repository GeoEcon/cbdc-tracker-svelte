import { writable } from 'svelte/store';

const removeTimeOut = 1000;

export const colorCategory = writable('new_status');

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
export const selectedIds = generateIdArrayStore();