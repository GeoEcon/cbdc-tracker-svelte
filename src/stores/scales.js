import { derived } from 'svelte/store';
import { scaleLinear } from 'd3';

import { data } from './data';
import { mapWidth } from './map';

const MAXSTATUSBARWIDTH = 1000;

export const statusBarScale = derived([data, mapWidth], ([$data, $mapWidth]) => {
  let start = 0;
  let end = $mapWidth;
  if ($mapWidth > MAXSTATUSBARWIDTH) {
    start = ($mapWidth - MAXSTATUSBARWIDTH) / 2;
    end = start + MAXSTATUSBARWIDTH;
  }
  console.log({start, end, $mapWidth})

  return scaleLinear()
    .domain([0, $data.length])
    .range([start, end]);
});