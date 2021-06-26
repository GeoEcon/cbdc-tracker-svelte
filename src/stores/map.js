import { writable, derived } from 'svelte/store';
import { zoomIdentity, geoOrthographic, geoEqualEarth, geoPath } from 'd3';
import { feature } from 'topojson-client';

import { isVertical } from './device';

import world from '../inputs/countries-topo.json';
import specialFeatures from '../inputs/countries-special.json';

const { features } = feature(world, world.objects.countries);

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
          .rotate([-75, -10]),
        geoOrthographic()
          .fitSize([$mapWidth, $mapWidth], sphere)
          .translate([$mapWidth / 2, $mapHeight * 0.7])
          .rotate([70, -10]),
      ];
    } else {
      return [
        geoEqualEarth()
          .fitSize([$mapWidth, $mapHeight], sphere)
          .translate([$mapWidth / 2, $mapHeight * 0.55])
          .rotate([-6, 0]),
      ];
    }
  }
);

export const paths = derived(projections, ($projections) => {
  return $projections.map((projection) => geoPath(projection));
});

export const projectedData = derived(paths, ($paths) => {
  return $paths.map((path) => {
    return [...features, ...specialFeatures]
      .filter((d) => !['Antarctica'].includes(d.properties.name))
      .map((d, i) => {
        return {
          id: i,
          name: d.properties.name,
          path: path(d),
          centroid: path.centroid(d),
        };
      });
  });
});
