import { mean } from 'd3';

export const euroCountries = [
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

export const clusterSetup = [
  {
    id: 0,
    name: 'Eastern Carribean (Pilot)',
    countries: [
      'Anguilla',
      'Montserrat',
      'Dominica',
      'Saint Vincent and the Grenadines'
    ],
    centroid: [-58, 17]
  },
  {
    id: 1,
    name: 'Eastern Carribean (Launched)',
    countries: [
      'Saint Kitts and Nevis',
      'Antigua and Barbuda',
      'Saint Lucia',
      'Grenada'
    ],
    centroid: [-64, 14]
  },
  {
    id: 2,
    name: 'Levante (Development)',
    countries: [
      'Israel',
      'Lebanon'
    ],
    centroid: [31, 33.5]
  },
];

export const geoMean = (coords) => {
  const x = mean(coords, d => d[0]);
  const y = mean(coords, d => d[1]);
  return [x || 0, y || 0];
};