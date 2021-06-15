import { writable, derived } from 'svelte/store';

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

export const rawData = writable([]);

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
        current_status: d.current_status.map(cs => ({name: cs, color: statusColorScale[cs]})),
        new_status: d.new_status.map(cs => ({name: cs, color: statusColorScale[cs]})),
        show:
          hasOverlap(d.current_status, $statusFilter) &&
          hasOverlap(d.technology, $technologyFilter) &&
          hasOverlap(d.infrastructure, $infrastructureFilter) &&
          hasOverlap(d.access, $accessFilter) &&
          hasOverlap(d.corporate_partnership, $corporatePartnershipFilter) &&
          hasOverlap(
            d.crossborder_partnerships,
            $crossborderPartnershipsFilter
          ),
      };
    });
  }
);
