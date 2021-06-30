import { readable, derived } from 'svelte/store';

import { loadTrackerData } from '../utils/load';
import {
  statusFilter,
  countryFilter,
  useCaseFilter,
  technologyFilter,
  architectureFilter,
  infrastructureFilter,
  accessFilter,
  corporatePartnershipFilter,
  crossborderPartnershipsFilter,
} from './filter';
import { hasOverlap } from '../utils/logic';
import {
  statusColorScale,
  countryColorScale,
  useCaseColorScale,
  technologyColorScale,
  architectureColorScale,
  infrastructureColorScale,
  accessColorScale } from '../stores/scales';

const trackerDataPath = 'data/tracker.csv';

export const rawData = readable([], async (set) => {
  set(await loadTrackerData(trackerDataPath));
});

export const scaledData = derived(
  [
    rawData,
    statusColorScale,
    countryColorScale,
    useCaseColorScale,
    technologyColorScale,
    architectureColorScale,
    infrastructureColorScale,
    accessColorScale
  ],
  ([
    $rawData,
    $statusColorScale,
    $countryColorScale,
    $useCaseColorScale,
    $technologyColorScale,
    $architectureColorScale,
    $infrastructureColorScale,
    $accessColorScale
  ]) => {
    return $rawData.map((d) => {
      return {
        ...d,
        name: {
          name: d.name,
          color: $countryColorScale[d.name]
        },
        categories: {
          ...d.categories,
          new_status: {
            name: d.categories.new_status,
            color: $statusColorScale[d.categories.new_status],
          },
          use_case: {
            name: d.categories.use_case,
            color: $useCaseColorScale[d.categories.use_case],
          },
          technology: {
            name: d.categories.technology,
            color: $technologyColorScale[d.categories.technology],
          },
          architecture: {
            name: d.categories.architecture,
            color: $architectureColorScale[d.categories.architecture],
          },
          infrastructure: {
            name: d.categories.infrastructure,
            color: $infrastructureColorScale[d.categories.infrastructure],
          },
          access: {
            name: d.categories.access,
            color: $accessColorScale[d.categories.access],
          },
        }
      };
    });
  }, []);

export const data = derived(
  [
    scaledData,
    statusFilter,
    countryFilter,
    useCaseFilter,
    technologyFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter,
    corporatePartnershipFilter,
    crossborderPartnershipsFilter,
  ],
  ([
    $scaledData,
    $statusFilter,
    $countryFilter,
    $useCaseFilter,
    $technologyFilter,
    $architectureFilter,
    $infrastructureFilter,
    $accessFilter,
    $corporatePartnershipFilter,
    $crossborderPartnershipsFilter,
  ]) => {
    return $scaledData.map((d) => {
      return {
        ...d,
        show:
          hasOverlap([d.categories.new_status.name], $statusFilter) &&
          hasOverlap([d.name.name], $countryFilter) &&
          hasOverlap([d.categories.use_case.name], $useCaseFilter) &&
          hasOverlap([d.categories.technology.name], $technologyFilter) &&
          hasOverlap([d.categories.architecture.name], $architectureFilter) &&
          hasOverlap([d.categories.infrastructure.name], $infrastructureFilter) &&
          hasOverlap([d.categories.access.name], $accessFilter) &&
          hasOverlap(
            [d.categories.corporate_partnership],
            $corporatePartnershipFilter
          ) &&
          hasOverlap(
            [d.categories.crossborder_partnerships],
            $crossborderPartnershipsFilter
          ),
      };
    });
  },
  []
);
