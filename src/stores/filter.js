import { writable } from 'svelte/store';

function createMultiFilter() {
  const { subscribe, set, update } = writable([]);

  const init = (data, col) => {
    const values = [...new Set(data.map((d) => d[col]).flat())];
    set(
      values.map((value) => {
        return {
          id: value,
          name: value,
          selected: true,
        };
      })
    );
  };

  const unselect = (id) =>
    update((f) =>
      f.map((d) => ({
        ...d,
        selected: [id].flat().includes(d.id) ? false : d.selected,
      }))
    );

  const unselectAll = () =>
    update((f) => f.map((d) => ({ ...d, selected: false })));

  const select = (id) =>
    update((f) =>
      f.map((d) => ({
        ...d,
        selected: [id].flat().includes(d.id) ? true : d.selected,
      }))
    );

  const selectOne = (id) => {
    unselectAll();
    select(id);
  };

  const selectAll = () =>
    update((f) => f.map((d) => ({ ...d, selected: true })));

  const applyBoolArray = (arr) => {
    const tmpArr = [...arr].reverse();
    update((f) =>
      f
        .reverse()
        .map((d, i) => ({
          ...d,
          selected: tmpArr[i] !== undefined ? tmpArr[i] : false,
        }))
        .reverse()
    );
  };

  return {
    subscribe,
    set,
    init,
    select,
    selectOne,
    selectAll,
    unselect,
    unselectAll,
    applyBoolArray,
  };
}

export const statusFilter = createMultiFilter();
export const technologyFilter = createMultiFilter();
export const infrastructureFilter = createMultiFilter();
export const accessFilter = createMultiFilter();
export const corporatePartnershipFilter = createMultiFilter();
export const crossborderPartnershipsFilter = createMultiFilter();

export const initFilters = (data) => {
  statusFilter.init(data, 'new_status');
  technologyFilter.init(data, 'technology');
  infrastructureFilter.init(data, 'infrastructure');
  accessFilter.init(data, 'access');
  corporatePartnershipFilter.init(data, 'corporate_partnership');
  crossborderPartnershipsFilter.init(data, 'crossborder_partnerships');
};
