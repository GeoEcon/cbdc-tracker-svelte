<script>
  import { slide } from 'svelte/transition';

  import {
    countryFilter,
    statusFilter,
    useCaseFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter,
    corporatePartnershipFilter,
    crossborderPartnershipsFilter
   } from '../../stores/filter';
  import {
    fullStatusRollup,
    fullUseCaseRollup,
    fullArchitectureRollup,
    fullInfrastructureRollup,
    fullAccessRollup,
    fullCorporatePartnershipRollup,
    fullCrossborderPartnershipsRollup,
    statusRollup,
    useCaseRollup,
    architectureRollup,
    infrastructureRollup,
    accessRollup,
    crossborderPartnershipsRollup,
    corporatePartnershipRollup
   } from '../../stores/aggregation';
  import { categoryNameScale } from '../../stores/scales';
  import { isVertical } from '../../stores/device';
  import { definitions, tooltip } from '../../stores/definitions';
  import { css } from '../../actions/css';
  import { countryGroups } from '../../utils/geo';

  import FilterTitle from './FilterTitle.svelte';
  import Logo from './Logo.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: extraFiltersExpanded = !$isVertical;

  $: dropdownsTop = [
    {
      filter: countryFilter,
      label: $categoryNameScale.name,
      shortCuts: countryGroups,
      fullRollup: [],
      rollup: [],
      info: null
    },
    {
      filter: statusFilter,
      label: $categoryNameScale.new_status,
      shortCuts: [],
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup,
      info: $definitions.status
    }
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottom = [
    {
      filter: useCaseFilter,
      label: $categoryNameScale.use_case,
      shortCuts: [],
      fullRollup: $fullUseCaseRollup,
      rollup: $useCaseRollup,
      info: $definitions.use_case
    },
    {
      filter: architectureFilter,
      label: $categoryNameScale.architecture,
      shortCuts: [],
      fullRollup: $fullArchitectureRollup,
      rollup: $architectureRollup,
      info: $definitions.architecture
    },
    {
      filter: infrastructureFilter,
      label: $categoryNameScale.infrastructure,
      shortCuts: [],
      fullRollup: $fullInfrastructureRollup,
      rollup: $infrastructureRollup,
      info: $definitions.infrastructure
    },
    {
      filter: accessFilter,
      label: $categoryNameScale.access,
      shortCuts: [],
      fullRollup: $fullAccessRollup,
      rollup: $accessRollup,
      info: $definitions.access
    },
    {
      filter: corporatePartnershipFilter,
      label: $categoryNameScale.corporate_partnership,
      shortCuts: [],
      fullRollup: $fullCorporatePartnershipRollup,
      rollup: $corporatePartnershipRollup,
      info: $definitions.access
    },
    {
      filter: crossborderPartnershipsFilter,
      label: $categoryNameScale.crossborder_partnerships,
      shortCuts: [],
      fullRollup: $fullCrossborderPartnershipsRollup,
      rollup: $crossborderPartnershipsRollup,
      info: $definitions.access
    }
  ].map((d, i) => ({...d, id: i}));

  $: maxColumns = Math.max(dropdownsTop.length, dropdownsBottom.length);
</script>

<div
  class="filter-bar"
  use:css={{maxColumns, halfMaxColumns: Math.ceil(maxColumns / 2)}}
>
  <FilterTitle
    label="Filters"
  />
  <div class="standard grid-container">
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup, info, shortCuts } (id)}
      <Dropdown
        filter={filter}
        label={label}
        shortCuts={shortCuts}
        fullRollup={fullRollup}
        rollup={rollup}
        info={info}
        tooltip={tooltip}
        showReset
        showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
      />
    {/each}
    <div class="share-panel">
    </div>
    <div class="logo">
      <Logo />
    </div>
  </div>
  <FilterTitle
    label="Additional filters"
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
    padding: 0.5rem 1rem;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0.3rem;
    row-gap: 0.3rem;
    align-items: stretch;
    justify-items: stretch;
    justify-content: end;
  }

  .grid-container.standard {
    grid-template-columns: 1fr;
  }

  .share-panel, .logo {
    display: none;
  }

  @media (min-width: 980px) {
    .share-panel {
      display: block;
    }

    .logo {
      justify-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (min-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(var(--halfMaxColumns), 1fr);
    }

    .grid-container.standard {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 980px) {
    .grid-container {
      grid-template-columns: repeat(var(--maxColumns), 1fr);
    }

    .grid-container.standard {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>