import { readable, derived } from 'svelte/store';

import { loadTrackerData } from '../utils/load';
import {
  statusFilter,
  technologyFilter,
  infrastructureFilter,
  accessFilter,
  corporatePartnershipFilter,
  crossborderPartnershipsFilter,
} from './filter';
import { hasOverlap } from '../utils/logic';
import { statusColorScale } from '../utils/scales';

const trackerDataPath = 'data/tracker.csv';

export const rawData = readable([], async (set) => {
  set(await loadTrackerData(trackerDataPath));
});

export const data = derived(
  [
    rawData,
    statusFilter,
    technologyFilter,
    infrastructureFilter,
    accessFilter,
    corporatePartnershipFilter,
    crossborderPartnershipsFilter,
  ],
  ([
    $rawData,
    $statusFilter,
    $technologyFilter,
    $infrastructureFilter,
    $accessFilter,
    $corporatePartnershipFilter,
    $crossborderPartnershipsFilter,
  ]) => {
    return $rawData.map((d) => {
      return {
        ...d,
        categories: {
          ...d.categories,
          new_status: {
            name: d.categories.new_status,
            color: statusColorScale[d.categories.new_status],
          },
        },
        show:
          hasOverlap([d.categories.new_status], $statusFilter) &&
          hasOverlap(d.categories.technology, $technologyFilter) &&
          hasOverlap(d.categories.infrastructure, $infrastructureFilter) &&
          hasOverlap(d.categories.access, $accessFilter) &&
          hasOverlap(
            d.categories.corporate_partnership,
            $corporatePartnershipFilter
          ) &&
          hasOverlap(
            d.categories.crossborder_partnerships,
            $crossborderPartnershipsFilter
          ),
      };
    });
  }
, []);
