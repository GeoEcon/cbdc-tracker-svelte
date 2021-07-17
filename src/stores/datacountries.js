import { derived } from 'svelte/store';
import { sortBy } from 'lodash-es';

import { data } from './data';
import { projectedData, mapWidth, mapHeight, clusters } from './map';
import { colorCategory } from './colorcategory';
import { isDefined } from '../utils/logic';
import styles from '../utils/styles';

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
    return dataCountries;
  }, []);

  export const dataClusters = derived([clusters, dataCountries, colorCategory], ([$clusters, $dataCountries, $colorCategory]) => {
    return $clusters[0].map(cluster => {
      const countries = $dataCountries.filter(d => cluster.countries.includes(d.name.name));
      console.log(countries)
      return {
        ...cluster,
        show: countries.some(d => d.show),
        color: countries.length ? countries[0].categories[$colorCategory].color : styles.darkgray
      };
    });
  });