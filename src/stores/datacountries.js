import { derived } from 'svelte/store';
import { sortBy, xor } from 'lodash-es';

import { data } from './data';
import { projectedData, mapWidth, mapHeight } from './map';
import { isDefined } from '../utils/logic';

export const dataCountries = derived(
  [
    data,
    projectedData,
    mapWidth,
    mapHeight
  ], ([
    $data,
    $projectedData,
    $mapWidth,
    $mapHeight
  ]) => {
  const availableCountries = $data.map(d => d.name.name);
  const dataCountries = sortBy($projectedData
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
      d => d.status
    ])
    .map((d, i) => {
      return {
        ...d,
        lineVisible: d.show && (d.centroid[0] > 0 && d.centroid[0] < $mapWidth && d.centroid[1] > 0 && d.centroid[1] < $mapHeight),
        orderId: i + 0.5
      };
    });
    // console.log(dataCountries.length, availableCountries.length, xor(dataCountries.map(d => d.name.name), availableCountries))
    return dataCountries;
  }, []);