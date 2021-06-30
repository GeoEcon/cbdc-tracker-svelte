import { csv, json } from 'd3';
import { initFilters } from '../stores/filter';

const splitValue = (value) =>
  value
    .split(',')
    .map((d) => d.trim())
    .map((d) => d === '' ? 'n/a' : d);

const curate = (value) => {
  if (!value) return 'n/a';
  return value;
};

export const loadTrackerData = async (dataPath) => {
  // load and format the data
  const data = await csv(dataPath, (d) => {
    return {
      owner: d.Owner,
      name: d.Name,
      overview: d.Overview,
      key_developments: d['Key Developments'],
      categories: {
        new_status: curate(d['New Status']),
        use_case: curate(d['Use case']),
        technology: curate(d['Underlying technology: corda or Ethereum']),
        architecture: curate(d['Architecture: direct CBDC or hybrid']),
        infrastructure: curate(d['Infrastructure: DLT or conventional']),
        access: curate(d['Access: token or account']),
        corporate_partnership: curate(d['Corporate partnership']),
        crossborder_partnerships: curate(d['Cross-border partnerships']),
      },
      sources: d.Sources.split(' '),
      notes: d.Notes,
    };
  });

  // filter for valid entries
  const filteredData = data
    .filter(
      (d) => d.categories.new_status !== 'n/a'
    )
    .filter(
      (d) => d.categories.new_status !== 'No development yet'
    )
    .filter(
      (d) => !['Euro Area'].includes(d.name)
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
