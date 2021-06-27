import { writable, derived } from 'svelte/store';
import { zoomIdentity, geoOrthographic, geoEqualEarth, geoPath } from 'd3';
import { feature } from 'topojson-client';

import { isVertical } from './device';

import world from '../inputs/countries-topo.json';
import specialFeatures from '../inputs/countries-special.json';

const { features } = feature(world, world.objects.countries);

const sphere = { type: 'Sphere' };

let initialTransform = [];

export const mapWidth = writable(0);
export const mapHeight = writable(0);

export const mapTransform = writable(zoomIdentity);

export const projections = derived(
  [mapWidth, mapHeight, isVertical],
  ([$mapWidth, $mapHeight, $isVertical]) => {
    console.log('init projections')
    let projections = [];
    if ($isVertical) {
      projections = [
        geoOrthographic()
          .fitSize([$mapWidth, $mapWidth], sphere)
          .translate([0, -$mapHeight * 0.25])
          .rotate([-75, -10]),
        geoOrthographic()
          .fitSize([$mapWidth, $mapWidth], sphere)
          .translate([0, $mapHeight * 0.25])
          .rotate([70, -10]),
      ];
    } else {
      projections = [
        geoEqualEarth()
          .fitSize([$mapWidth, $mapHeight], sphere)
          .translate([0, 0])
          .rotate([-6, 0])
      ];
    }
    initialTransform = projections.map(projection => {
      const [ tx, ty ] = projection.translate();
      return {
        ts: projection.scale(),
        tx,
        ty
      };
    });
    return projections;
  }
);

const transformedProjections = derived([projections, mapTransform], ([$projections, $mapTransform]) => {
  return $projections.map((projection, i) => {
    return projection
      .scale(initialTransform[i].ts * $mapTransform.k)
      .translate([$mapTransform.x, $mapTransform.y]);
  });
});

export const paths = derived(transformedProjections, ($transformedProjections) => {
  return $transformedProjections.map((projection) => {
    return geoPath(projection);
  });
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
