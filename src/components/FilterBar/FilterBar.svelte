<script>
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
  import { css } from '../../actions/css';

  import Dropdown from '../Dropdown/Dropdown.svelte';

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
  <div class="grid-container">
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup } (id)}
      <Dropdown
        filter={filter}
        label={label}
        fullRollup={fullRollup}
        rollup={rollup}
      />
    {/each}
  </div>
  <div class="grid-container">
    {#each dropdownsBottom as { id, filter, label, fullRollup, rollup } (id)}
      <Dropdown
        filter={filter}
        label={label}
        fullRollup={fullRollup}
        rollup={rollup}
      />
    {/each}
  </div>
</div>

<style>
  .filter-bar {
    width: 100%;
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