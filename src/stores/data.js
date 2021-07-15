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
  categoryNameScale,
  statusColorScale,
  countryColorScale,
  useCaseColorScale,
  technologyColorScale,
  architectureColorScale,
  infrastructureColorScale,
  accessColorScale } from '../stores/scales';
import styles from '../utils/styles';

const trackerDataPath = 'data/tracker.csv';

export const rawData = readable([], async (set) => {
  set(await loadTrackerData(trackerDataPath));
});

export const scaledData = derived(
  [
    rawData,
    categoryNameScale,
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
    $categoryNameScale,
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
          title: $categoryNameScale.name,
          color: $countryColorScale[d.name]
        },
        categories: {
          ...d.categories,
          new_status: {
            name: d.categories.new_status,
            title: $categoryNameScale.new_status,
            color: $statusColorScale[d.categories.new_status],
            filterable: true
          },
          use_case: {
            name: d.categories.use_case,
            title: $categoryNameScale.use_case,
            color: $useCaseColorScale[d.categories.use_case],
            filterable: true
          },
          technology: {
            name: d.categories.technology,
            title: $categoryNameScale.technology,
            color: $technologyColorScale[d.categories.technology],
            filterable: false
          },
          architecture: {
            name: d.categories.architecture,
            title: $categoryNameScale.architecture,
            color: $architectureColorScale[d.categories.architecture],
            filterable: true
          },
          infrastructure: {
            name: d.categories.infrastructure,
            title: $categoryNameScale.infrastructure,
            color: $infrastructureColorScale[d.categories.infrastructure],
            filterable: true
          },
          access: {
            name: d.categories.access,
            title: $categoryNameScale.access,
            color: $accessColorScale[d.categories.access],
            filterable: true
          },
          corporate_partnership: {
            name: d.categories.corporate_partnership,
            title: $categoryNameScale.corporate_partnership,
            color: styles.gray,
            filterable: false
          },
          crossborder_partnerships: {
            name: d.categories.crossborder_partnerships,
            title: $categoryNameScale.crossborder_partnerships,
            color: styles.gray,
            filterable: false
          }
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
            [d.categories.corporate_partnership.name],
            $corporatePartnershipFilter
          ) &&
          hasOverlap(
            [d.categories.crossborder_partnerships.name],
            $crossborderPartnershipsFilter
          ),
      };
    });
  },
  []
);
