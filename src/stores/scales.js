import { writable, derived } from 'svelte/store';
import { range, hcl } from 'd3';

import {
  countryFilter,
  useCaseFilter,
  technologyFilter,
  architectureFilter,
  infrastructureFilter,
  accessFilter
} from './filter';
import { statusColors, statusLevels } from '../utils/status';
import styles from '../utils/styles';

const generateCategoryColors = (numColors = 8, chroma = 50, lightness = 80) =>
  range(numColors).map((i) =>
    hcl((360 * i) / (1 + numColors), chroma, lightness).formatHex()
  );

export const generateHarmonicColorScale = (arr, na = 'n/a', naColor = styles.gray) => {
  const colors = generateCategoryColors(arr.length);
  return arr.reduce((acc, cur, i) => ({ ...acc, [cur]: (cur === na ? naColor : colors[i]) }), {});
};

export const statusColorScale = writable(
  (function () {
    return statusLevels.reduce(
      (acc, cur, i) => ({ ...acc, [cur.name]: statusColors[i] }),
      {}
    );
  })()
);

export const countryColorScale = derived(countryFilter, $countryFilter => {
  return generateHarmonicColorScale($countryFilter.map(d => d.name));
});

export const useCaseColorScale = derived(useCaseFilter, $useCaseFilter => {
  return generateHarmonicColorScale($useCaseFilter.map(d => d.name));
});

export const technologyColorScale = derived(technologyFilter, $technologyFilter => {
  return generateHarmonicColorScale($technologyFilter.map(d => d.name));
});

export const architectureColorScale = derived(architectureFilter, $architectureFilter => {
  return generateHarmonicColorScale($architectureFilter.map(d => d.name));
});

export const infrastructureColorScale = derived(infrastructureFilter, $infrastructureFilter => {
  return generateHarmonicColorScale($infrastructureFilter.map(d => d.name));
});

export const accessColorScale = derived(accessFilter, $accessFilter => {
  return generateHarmonicColorScale($accessFilter.map(d => d.name));
});