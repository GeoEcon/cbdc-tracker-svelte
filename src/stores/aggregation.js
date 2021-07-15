import { derived } from 'svelte/store';
import { rollups } from 'd3';
import { sortBy } from 'lodash-es';

import { scaledData, data } from './data';
import { statusLevels } from '../utils/status';
import { sortToEnd } from '../utils/misc';

const generateRollup = (arr, sortArr = null) => {
  let rollup = rollups(arr, d => d.length, d => d.name)
    .map(d => {
      return {
        name: d[0],
        color: arr.find(dd => dd.name === d[0]).color,
        n: d[1],
        percent: 100 * d[1] / arr.length
      };
    });
  if (sortArr !== null) {
    rollup = sortBy(rollup, d => sortArr.indexOf(d.name));
  } else {
    rollup = sortBy(rollup, d => {
      return d.name.toLowerCase()
    });
  }

  rollup = sortToEnd(rollup, 'name', 'Undecided');

  return rollup;
};

export const fullStatusRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.new_status), statusLevels.map(d => d.name)));

export const fullCountryRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.name)));

export const fullUseCaseRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.use_case)));

export const fullTechnologyRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.technology)));

export const fullArchitectureRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.architecture)));

export const fullInfrastructureRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.infrastructure)));

export const fullAccessRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.access)));


const showData = derived(data, $data => $data.filter(d => d.show));

export const statusRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.new_status), statusLevels.map(d => d.name)));

export const countryRollup = derived(showData, $showData => generateRollup($showData.map(d => d.name)));

export const useCaseRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.use_case)));

export const technologyRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.technology)));

export const architectureRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.architecture)));

export const infrastructureRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.infrastructure)));

export const accessRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.access)));