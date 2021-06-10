import { csv, json } from 'd3';
import { feature } from 'topojson-client';
import { initFilters } from '../stores/filter';

const splitValue = (value) =>
  value
    .split(',')
    .map((d) => d.trim())
    .filter((d) => d);

export const loadTrackerData = async (dataPath) => {
  // load and format the data
  const data = await csv(dataPath, (d) => {
    return {
      owner: d.Owner,
      name: d.Name,
      current_status: splitValue(d['Current Status']),
      new_status: splitValue(d['New Status']),
      overview: d.Overview,
      key_developments: splitValue(d['Key Developments']),
      use_case: splitValue(d['Use case']),
      technology: splitValue(d['Underlying technology: corda or Ethereum']),
      architecture: splitValue(d['Architecture: direct CBDC or hybrid']),
      infrastructure: splitValue(d['Infrastructure: DLT or conventional']),
      access: splitValue(d['\nAccess: token or account']),
      corporate_partnership: splitValue(d['Corporate partnership']),
      crossborder_partnerships: splitValue(d['Cross-border partnerships']),
      sources: d.Sources,
      notes: d.Notes,
    };
  });

  // filter for valid entries
  const filteredData = data.filter(
    (d) => !d.current_status.includes('No development yet')
  );

  // initialize the filters
  initFilters(filteredData);

  return filteredData;
};

export const loadMapData = async (dataPath) => {
  const world = await json(dataPath);
  const { features } = feature(world, world.objects.countries);
  return features;
};
