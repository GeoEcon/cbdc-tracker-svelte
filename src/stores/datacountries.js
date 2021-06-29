import { derived } from 'svelte/store';
import { sortBy } from 'lodash-es';

import { data } from './data';
import { projectedData, mapWidth, mapHeight } from './map';
import { statusLevels } from '../utils/status';
import { colorCategory } from './selection';
import { isDefined } from '../utils/logic';

export const dataCountries = derived(
  [
    data,
    projectedData,
    mapWidth,
    mapHeight,
    colorCategory
  ], ([
    $data,
    $projectedData,
    $mapWidth,
    $mapHeight,
    $colorCategory
  ]) => {
  const availableCountries = $data.map(d => d.name.name);
  return sortBy($projectedData
    .flat()
    .filter(d => isDefined(d.path))
    .filter(d => availableCountries.includes(d.name))
    .map(d => {
      const datum = $data.find(dd => dd.name.name === d.name);
      return {
        ...d,
        ...datum
      };
    }),
    [
      d => statusLevels.map(dd => dd.name).indexOf(d.categories[$colorCategory].name),
      d => d.centroid[0],
      d => -d.centroid[1]
    ])
    .map((d, i) => {
      return {
        ...d,
        lineVisible: d.show && (d.centroid[0] > 0 && d.centroid[0] < $mapWidth && d.centroid[1] > 0 && d.centroid[1] < $mapHeight),
        orderId: i + 0.5
      };
    });
  }, []);