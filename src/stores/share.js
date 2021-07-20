import { derived } from 'svelte/store';

import {
  statusFilter,
  useCaseFilter,
  architectureFilter,
  infrastructureFilter,
  accessFilter,
  countryFilter
} from './filter';
import { selectedId } from './selection';
import { areAllSelected } from "../utils/logic";

// export const baseUrl = 'https://www.atlanticcouncil.org/blogs/econographics/the-rise-of-central-bank-digital-currencies';
export const baseUrl = 'http://localhost:5000';

export const filtersToHex = (arr) => {
  const hex = arr
    .map((d) => binaryToHex(d.map((d) => +d.selected).join('')))
    .join(';');
  return hex;
};

export const filtersToBin = (arr) => {
  const bin = arr.map((d) => (d ? 1 : 0)).join('');
  return bin;
};

export const binaryToHex = (binary) =>
  parseInt(binary, 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) =>
  binary.split('').map((d) => (d === '0' ? false : true));

export const parseUrl = (urlParams) => {
  let res = {};
  if (!urlParams) return res;

  const params = urlParams.get('params') || '';
  const country = urlParams.get('country') || '';

  if (params) {
    const [
      status,
      useCase,
      architecture,
      infrastructure,
      access
    ] = params.split(';');
    res = {
      ...res,
      status: binaryToBool(hexToBinary(status)),
      useCase: binaryToBool(hexToBinary(useCase)),
      architecture: binaryToBool(hexToBinary(architecture)),
      infrastructure: binaryToBool(hexToBinary(infrastructure)),
      access: binaryToBool(hexToBinary(access)),
    };
  }

  if (country) {
    res = {
      ...res,
      country: country.split(';')
    };
  }

  return res;
};

export const filterToString = (filter) => {
  if (areAllSelected(filter)) return;
  return filter.filter(d => d.selected).map(d => d.id).join(';');
};

export const filterUrl = derived(
  [
    statusFilter,
    useCaseFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter,
    countryFilter,
    selectedId
  ],
  ([
    $statusFilter,
    $useCaseFilter,
    $architectureFilter,
    $infrastructureFilter,
    $accessFilter,
    $countryFilter,
    $selectedId
  ]) => {
    const params = filtersToHex([
      $statusFilter,
      $useCaseFilter,
      $architectureFilter,
      $infrastructureFilter,
      $accessFilter
    ]);
    const country = filterToString($countryFilter) || '';

    return `${baseUrl}/?params=${params}&country=${country}&selected=${$selectedId || ''}`.replace('#', '%23');
  }
);