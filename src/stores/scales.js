import { derived } from 'svelte/store';
import { scaleLinear } from 'd3';

import { data } from './data';
import { mapWidth } from './map';

const MAXSTATUSBARWIDTH = Math.Inf;

export const statusBarScale = derived(
  [data, mapWidth],
  ([$data, $mapWidth]) => {
    let start = 0;
    let end = $mapWidth;
    if ($mapWidth > MAXSTATUSBARWIDTH) {
      start = ($mapWidth - MAXSTATUSBARWIDTH) / 2;
      end = start + MAXSTATUSBARWIDTH;
    }

    return scaleLinear()
      .domain([0, $data.length - 1])
      .range([start, end]);
  }
);