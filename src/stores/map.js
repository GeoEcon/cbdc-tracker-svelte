import { writable, derived } from 'svelte/store';
import { zoomIdentity, geoOrthographic, geoEqualEarth, geoPath } from 'd3';

import rawData from '../inputs/country-shapes';
import { isVertical } from './device';

const sphere = { type: 'Sphere' };

export const mapWidth = writable(0);
export const mapHeight = writable(0);

export const mapTransform = writable(zoomIdentity);

export const projections = derived(
  [mapWidth, mapHeight, isVertical],
  ([$mapWidth, $mapHeight, $isVertical]) => {
    if ($isVertical) {
      return [
        geoOrthographic()
          .fitSize([$mapWidth, $mapWidth], sphere)
          .rotate([-75, -20]),
        geoOrthographic()
          .fitSize([$mapWidth, $mapWidth], sphere)
          .translate([$mapWidth / 2, $mapHeight * 0.7])
          .rotate([70, -20]),
      ];
    } else {
      return [
        geoEqualEarth()
          .fitSize([$mapWidth, $mapHeight], sphere)
          .rotate([-6, 0]),
      ];
    }
  }
);

export const paths = derived(projections, ($projections) => {
  return $projections.map((projection) => geoPath(projection, null));
});

export const projectedData = derived(paths, $paths => {
  return $paths.map((path) => {
    return rawData.map((d, i) => {
      return {
        id: i,
        name: d.properties.name,
        path: path(d),
        centroid: path.centroid(d),
      };
    });
  });
});
