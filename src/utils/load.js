import { csv } from "d3";

export const loadTrackerData = async (dataPath) => {
  const data = await csv(dataPath, d => {
    return {
      owner: d.Owner,
      name: d.Name,
      current_status: d['Current Status'],
      new_status: d['New Status'],
      overview: d.Overview,
      key_developments: d['Key Developments'],
      use_case: d['Use case'],
      technology: d['Underlying technology: corda or Ethereum'],
      architecture: d['Architecture: direct CBDC or hybrid'],
      infrastructure: d['Infrastructure: DLT or conventional'],
      access: d['\nAccess: token or account'],
      corporate_partnership: d['Corporate partnership'],
      crossborder_partnerships: d['Cross-border partnerships'],
      sources: d.Sources,
      notes: d.Notes
    };
  });
  
  const filteredData = data.filter(d => d.current_status !== 'No development yet');

  return filteredData;
};