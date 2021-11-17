<script>
  import { slide } from 'svelte/transition';

  import {
    corporatePartnershipFilter,
    crossborderPartnershipsFilter
   } from '../../stores/filter';
  import {
    fullCorporatePartnershipRollup,
    fullCrossborderPartnershipsRollup,
    crossborderPartnershipsRollup,
    corporatePartnershipRollup
   } from '../../stores/aggregation';
  import { categoryNameScale } from '../../stores/scales';
  import { isVertical } from '../../stores/device';
  import { definitions, tooltip } from '../../stores/definitions';
  import { css } from '../../actions/css';

  import FilterTitle from './FilterTitle.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: extraFiltersExpanded = !$isVertical;


  $: dropdownsBottom = [
    {
      filter: crossborderPartnershipsFilter,
      label: $categoryNameScale.crossborder_partnerships,
      shortCuts: [],
      fullRollup: $fullCrossborderPartnershipsRollup,
      rollup: $crossborderPartnershipsRollup,
      // below is to be modified with Nitya's definitions
      info: $definitions.access
    },
    {
      filter: corporatePartnershipFilter,
      label: $categoryNameScale.corporate_partnership,
      shortCuts: [],
      fullRollup: $fullCorporatePartnershipRollup,
      rollup: $corporatePartnershipRollup,
      // below is to be modified with Nitya's definitions
      info: $definitions.access
    }
  ].map((d, i) => ({...d, id: i}));

  $: maxColumns = Math.max(0, dropdownsBottom.length);
</script>

<div
  class="filter-bar"
  use:css={{maxColumns, halfMaxColumns: Math.ceil(maxColumns / 2)}}
>

  <FilterTitle
    label="Extra filters"
    expandable
    bind:expanded={extraFiltersExpanded}
  />
  {#if (extraFiltersExpanded)}
    <div
      class="extra grid-container"
      transition:slide
    >
      {#each dropdownsBottom as { id, filter, label, fullRollup, rollup, info } (id)}
        <Dropdown
          filter={filter}
          label={label}
          fullRollup={fullRollup}
          rollup={rollup}
          info={info}
          tooltip={tooltip}
          showReset
          showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .filter-bar {
    width: 100%;
    padding: 1rem 0;
  }

  .grid-container {
    display: grid;
    width: 100%;
    max-width: 600px;
    padding: 0.5rem 1rem;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0.3rem;
    row-gap: 0.3rem;
    align-items: stretch;
    justify-items: stretch;
    justify-content: end;
  }

  @media (min-width: 1200px) {

  }

  @media (min-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(var(--halfMaxColumns), 1fr);
    }
  }

  @media (min-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(var(--maxColumns), 1fr);
    }
  }
</style>