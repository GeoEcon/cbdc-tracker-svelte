import { writable } from 'svelte/store';

const removeTimeOut = 400;

const generateIdArrayStoreCluster = () => {
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

export const hoveredClusterIds = generateIdArrayStoreCluster();