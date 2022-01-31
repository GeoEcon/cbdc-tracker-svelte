import { readable, writable, derived } from 'svelte/store';
import { zoomIdentity, geoEqualEarth, geoPath } from 'd3';
import { feature, merge } from 'topojson-client';
import geojsonRewind from '@mapbox/geojson-rewind';

import { isVertical } from './device';
import { loadJson, loadCapitals } from '../utils/load';
import { euroCountries, clusterSetup, useCapitalCountries } from '../utils/geo';

const sphere = { type: 'Sphere' };

const worldDataPath = 'data/countries-topo.json'; // https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
const specialDataPath = 'data/countries-special.json';
const capitalDataPath = 'data/capitals.csv';

const features = readable([], async (set) => {
  const world = await loadJson(worldDataPath);
  const { features: worldFeatures } = feature(world, world.objects.countries1);

  // some smaller countries
  const specialFeatures = (await loadJson(specialDataPath)).map((d) => {
    return {
      ...d,
      geometry: geojsonRewind(d.geometry, true),
    };
  });

  const countries = [...worldFeatures, ...specialFeatures]
    .map((d) => {
      return {
        ...d,
        status: 'country',
      };
    })
    .filter((d) => !['Antarctica'].includes(d.properties.name));

  // create the Euro area
  const euroArea = {
    type: 'Feature',
    geometry: merge(
      world,
      world.objects.countries1.geometries.filter((d) =>
        euroCountries.includes(d.properties.name)
      )
    ),
    properties: { name: 'Euro Area' },
    status: 'region',
  };

  // get the capitals
  const capitals = await loadCapitals(capitalDataPath);

  // merge
  const mapData = [...countries, euroArea].map((d, i) => {
    const { lat, lon, name } =
      capitals.find((capital) => capital.country === d.properties.name) || {};
    return {
      ...d,
      id: i,
      capital: {
        name,
        coordinates: [+lon, +lat],
      },
      isClusterMember: clusterSetup
        .map((cluster) => cluster.countries)
        .flat()
        .includes(d.properties.name),
    };
  });

  set(mapData);
});

export const mapWidth = writable(0);
export const mapHeight = writable(0);

export const projection = derived(
  [mapWidth, mapHeight],
  ([$mapWidth, $mapHeight]) => {
    const projection = geoEqualEarth()
      .fitSize([$mapWidth, $mapHeight], sphere)
      .translate([0, 0])
      .rotate([-6, 0]);
    return projection;
  }
);

export const initialTransform = derived(
  [isVertical, mapWidth, mapHeight],
  ([$isVertical, $mapWidth, $mapHeight]) => {
    const projection = geoEqualEarth()
      .fitSize([$mapWidth, $mapHeight], sphere)
      .translate([0, 0])
      .rotate([-6, 0]);
    const [ x, y ] = projection.translate();
    if ($isVertical) {
      return zoomIdentity.translate(x + $mapWidth / 4.5, y + $mapHeight / 1.9).scale(projection.scale() * 3);
    }
    return zoomIdentity.translate(x + $mapWidth / 2, y + $mapHeight / 1.8).scale(projection.scale());
  },
  zoomIdentity
);

export const mapTransform = writable(zoomIdentity);

const transformedProjection = derived(
  [projection, mapTransform],
  ([$projection, $mapTransform]) => {
    return $projection
      .translate([$mapTransform.x, $mapTransform.y])
      .scale($mapTransform.k);
  }
);

export const path = derived(transformedProjection, ($transformedProjection) => {
  return geoPath($transformedProjection);
});

export const projectedData = derived([features, path], ([$features, $path]) => {
  const features = $features.map((d, i) => {
    let centroid = $path.centroid(d);
    if (useCapitalCountries.includes(d.properties.name)) {
      centroid = d.capital.name
        ? $path.projection()(d.capital.coordinates)
        : $path.centroid(d);
    }
    const projected = {
      id: i,
      name: d.properties.name,
      status: d.status,
      path: $path(d),
      centroid,
      isClusterMember: d.isClusterMember,
    };
    return projected;
  });
  return features;
});

export const clusters = derived(
  path,
  ($path) => {
    return clusterSetup.map((cluster) => {
      return {
        ...cluster,
        centroid: $path.projection()(cluster.centroid),
      };
    });
  },
  []
);
