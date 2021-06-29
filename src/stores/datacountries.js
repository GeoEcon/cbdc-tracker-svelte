import { derived } from 'svelte/store';
import { sortBy } from 'lodash-es';

import { data } from './data';
import { projectedData, mapWidth, mapHeight } from './map';
import { orderedStatusRollup } from './statusbar';
import { isDefined } from '../utils/logic';

export const dataCountries = derived(
  [
    data,
    projectedData,
    orderedStatusRollup,
    mapWidth,
    mapHeight
  ], ([
    $data,
    $projectedData,
    $orderedStatusRollup,
    $mapWidth,
    $mapHeight
  ]) => {
  let colorCategory = 'new_status';

  const availableCountries = $data.map(d => d.name);

  return sortBy($projectedData
    .flat()
    .filter(d => isDefined(d.path))
    .filter(d => availableCountries.includes(d.name))
    .map(d => {
      const datum = $data.find(dd => dd.name === d.name);
      return {
        ...d,
        ...datum
      };
    }),
    [
      d => $orderedStatusRollup.map(dd => dd.name).indexOf(d.categories[colorCategory].name),
      d => d.centroid[0]
    ])
    .map((d, i) => {
      return {
        ...d,
        lineVisible: d.show && (d.centroid[0] > 0 && d.centroid[0] < $mapWidth && d.centroid[1] > 0 && d.centroid[1] < $mapHeight),
        orderId: i + 0.5
      };
    });
  }, []);