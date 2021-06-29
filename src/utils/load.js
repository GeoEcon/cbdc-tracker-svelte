import { csv, json } from 'd3';
import { feature } from 'topojson-client';
import { initFilters } from '../stores/filter';

const splitValue = (value) =>
  value
    .split(',')
    .map((d) => d.trim())
    .map((d) => d === '' ? 'n/a' : d);

export const loadTrackerData = async (dataPath) => {
  // load and format the data
  const data = await csv(dataPath, (d) => {
    return {
      owner: d.Owner,
      name: d.Name,
      overview: d.Overview,
      key_developments: d['Key Developments'],
      categories: {
        new_status: d['New Status'],
        use_case: splitValue(d['Use case']),
        technology: splitValue(d['Underlying technology: corda or Ethereum']),
        architecture: splitValue(d['Architecture: direct CBDC or hybrid']),
        infrastructure: splitValue(d['Infrastructure: DLT or conventional']),
        access: splitValue(d['Access: token or account']),
        corporate_partnership: splitValue(d['Corporate partnership']),
        crossborder_partnerships: splitValue(d['Cross-border partnerships']),
      },
      sources: d.Sources,
      notes: d.Notes,
    };
  });

  // filter for valid entries
  const filteredData = data.filter(
    (d) => d.categories.new_status.length > 0 && !d.categories.new_status.includes('No development yet')
  );

  // initialize the filters
  initFilters(filteredData);

  return filteredData;
};

export const loadJson = async (dataPath) => {
  return await json(dataPath);
};

export const loadNaturalEarth = async (dataPath) => {
  const { features } = await json(dataPath);
  return features.map(d => {
    return {
      ...d,
      properties: {
        name: d.properties.ADMIN
      }
    };
  });
};
