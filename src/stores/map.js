import { readable, writable, derived } from 'svelte/store';
import { zoomIdentity, geoEqualEarth, geoPath } from 'd3';
import { feature, merge } from 'topojson-client';

import { isVertical } from './device';
import { loadJson, loadCapitals } from '../utils/load';

const sphere = { type: 'Sphere' };

const euroCountries = [
  'Belgium',
  'Germany',
  'Ireland',
  'Spain',
  'France',
  'Italy',
  'Luxembourg',
  'The Netherlands',
  'Austria',
  'Portugal',
  'Finland',
  'Greece',
  'Slovenia',
  'Cyprus',
  'Malta',
  'Slovakia',
  'Estonia',
  'Latvia',
  'Lithuania'
];

const worldDataPath = 'data/countries-topo.json'; // https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
const specialDataPath = 'data/countries-special.json';
const capitalDataPath = 'data/capitals.csv';

const features = readable([], async (set) => {
  const world = await loadJson(worldDataPath);
  const { features: worldFeatures } = feature(world, world.objects.countries1);

  // some smaller countries
  const specialFeatures = await loadJson(specialDataPath);

  const countries = [...worldFeatures, ...specialFeatures].map(d => {
    return {
      ...d,
      status: 'country'
    };
  })
  .filter((d) => !['Antarctica'].includes(d.properties.name));

  // create the Euro area
  const euroArea = {
    type: 'Feature',
    geometry: merge(world, world.objects.countries1.geometries.filter(d => euroCountries.includes(d.properties.name))),
    properties: { name: 'Euro Area'},
    status: 'region'
  };

  // get the capitals
  const capitals = await loadCapitals(capitalDataPath);

  // merge
  const mapData = [...countries, euroArea].map((d, i) => {
    const { lat, lon, name } = capitals.find(capital => capital.country === d.properties.name) || {};
    return {
      ...d,
      id: i,
      capital: {
        name,
        coordinates: [+lon, +lat]
      }
    };
  });

  set(mapData);
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
      return zoomIdentity.translate($mapWidth / 2, $mapHeight / 1.8);
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
        .map((d, i) => {
          const centroid = d.capital.name ? path.projection()(d.capital.coordinates) : path.centroid(d);
          const projected = {
            id: i,
            name: d.properties.name,
            status: d.status,
            path: path(d),
            centroid,
          };
          return projected;
        });
    });
  }
);