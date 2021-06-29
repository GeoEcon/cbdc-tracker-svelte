import { readable, writable, derived } from 'svelte/store';
import { zoomIdentity, geoEqualEarth, geoPath } from 'd3';
import { feature } from 'topojson-client';

import { isVertical } from './device';
import { loadJson, loadNaturalEarth } from '../utils/load';

const sphere = { type: 'Sphere' };

const worldDataPath = 'data/countries-topo.json'; // https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
// const naturalEarthDataPath = 'data/countries-110.json';
const specialDataPath = 'data/countries-special.json';

const features = readable([], async (set) => {
  const world = await loadJson(worldDataPath);
  const { features: worldFeatures } = feature(world, world.objects.countries1);

  const specialFeatures = await loadJson(specialDataPath);

  set([...worldFeatures, ...specialFeatures].map((d, i) => ({ ...d, id: i })));
});

let initialProjectionState = [];

export const mapWidth = writable(0);
export const mapHeight = writable(0);

export const initialTransform = derived(
  [isVertical, mapWidth, mapHeight],
  ([$isVertical, $mapWidth, $mapHeight]) => {
    if ($isVertical) {
      return zoomIdentity.translate($mapWidth / 0.7, $mapHeight / 1.7).scale(4.1);
    } else {
      return zoomIdentity.translate($mapWidth / 2, $mapHeight / 2);
    }
  },
  zoomIdentity
);

export const mapTransform = writable(initialTransform);

export const projections = derived(
  [mapWidth, mapHeight],
  ([$mapWidth, $mapHeight]) => {
    const projections = [
      geoEqualEarth()
        .fitSize([$mapWidth, $mapHeight], sphere)
        .translate([0, 0])
        .rotate([-6, 0]),
    ];
    const [tx, ty] = projections[0].translate();
    initialProjectionState = [{
      ts: projections[0].scale(),
      tx,
      ty,
    }];
    return projections;
  }
);

const transformedProjections = derived(
  [projections, mapTransform],
  ([$projections, $mapTransform]) => {
    return $projections.map((projection, i) => {
      return projection
        .scale(initialProjectionState[i].ts * $mapTransform.k)
        .translate([$mapTransform.x, $mapTransform.y]);
    });
  }
);

export const paths = derived(
  transformedProjections,
  ($transformedProjections) => {
    return $transformedProjections.map((projection) => {
      return geoPath(projection);
    });
  }
);

export const projectedData = derived(
  [features, paths],
  ([$features, $paths]) => {
    return $paths.map((path) => {
      return $features
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
  }
);