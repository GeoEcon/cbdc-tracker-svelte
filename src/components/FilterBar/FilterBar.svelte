<script>
  import { slide } from 'svelte/transition';

  import {
    statusFilter,
    countryFilter,
    useCaseFilter,
    technologyFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter } from '../../stores/filter';
  import {
    fullStatusRollup,
    fullUseCaseRollup,
    fullTechnologyRollup,
    fullArchitectureRollup,
    fullInfrastructureRollup,
    fullAccessRollup,
    statusRollup,
    useCaseRollup,
    technologyRollup,
    architectureRollup,
    infrastructureRollup,
    accessRollup } from '../../stores/aggregation';
  import { isVertical } from '../../stores/device';
  import { css } from '../../actions/css';

  import FilterTitle from './FilterTitle.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: extraFiltersExpanded = !$isVertical;

  $: dropdownsTop = [
    {
      filter: statusFilter,
      label: 'Status',
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup
    },
    {
      filter: countryFilter,
      label: 'Country',
      fullRollup: [],
      rollup: []
    }
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottom = [
    {
      filter: useCaseFilter,
      label: 'Use case',
      fullRollup: $fullUseCaseRollup,
      rollup: $useCaseRollup
    },
    {
      filter: technologyFilter,
      label: 'Technology',
      fullRollup: $fullTechnologyRollup,
      rollup: $technologyRollup
    },
    {
      filter: architectureFilter,
      label: 'Architecture',
      fullRollup: $fullArchitectureRollup,
      rollup: $architectureRollup
    },
    {
      filter: infrastructureFilter,
      label: 'Infrastructure',
      fullRollup: $fullInfrastructureRollup,
      rollup: $infrastructureRollup
    },
    {
      filter: accessFilter,
      label: 'Access',
      fullRollup: $fullAccessRollup,
      rollup: $accessRollup
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
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup } (id)}
      <Dropdown
        filter={filter}
        label={label}
        fullRollup={fullRollup}
        rollup={rollup}
      />
    {/each}
  </div>
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
      {#each dropdownsBottom as { id, filter, label, fullRollup, rollup } (id)}
        <Dropdown
          filter={filter}
          label={label}
          fullRollup={fullRollup}
          rollup={rollup}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .filter-bar {
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px dashed var(--gray);
  }

  .grid-container {
    display: grid;
    width: 100%;
    padding: 1rem;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0.3rem;
    row-gap: 0.3rem;
    align-items: stretch;
    justify-items: stretch;
    justify-content: end;
  }

  @media (min-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(var(--halfMaxColumns), 1fr);
    }
  }

  @media (min-width: 980px) {
    .grid-container {
      grid-template-columns: repeat(var(--maxColumns), 1fr);
    }
  }
</style>