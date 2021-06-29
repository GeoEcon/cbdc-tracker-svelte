import { derived } from 'svelte/store';
import { rollups } from 'd3';

import { statusColorScale, statusLevels } from '../utils/scales';
import { data } from './data';
import { statusBarScale } from './scales';
import { colorCategory } from './selection';

export const statusRollup = derived([data, colorCategory], ([$data, $colorCategory]) => {
  return rollups(
    $data,
    (v) => v.length,
    (d) => d.categories[$colorCategory].name
  ).map((d) => {
    return {
      name: d[0],
      n: d[1],
      color: statusColorScale[d[0]],
    };
  });
});

export const orderedStatusRollup = derived(
  [statusRollup, statusBarScale],
  ([$statusRollup, $statusBarScale]) => {
    let result = [];
    if ($statusRollup.length) {
      let accumN = 0;
      result = statusLevels.map((statusLevel) => {
        const curStatus = $statusRollup.find(
          (d) => d.name === statusLevel.name
        );
        accumN += curStatus.n;
        return {
          id: statusLevel.id,
          ...curStatus,
          x: $statusBarScale(accumN - curStatus.n),
          width: ($statusBarScale(1) - $statusBarScale(0)) * curStatus.n,
        };
      });
    }
    return result;
  }
);
