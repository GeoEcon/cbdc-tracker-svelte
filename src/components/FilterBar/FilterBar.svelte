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

  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: dropdowns = [
    {
      filter: statusFilter,
      label: 'Status',
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup
    },
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
    },
    {
      filter: countryFilter,
      label: 'Country',
      fullRollup: [],
      rollup: []
    }
  ].map((d, i) => ({...d, id: i}));
</script>

<div class="filter-bar">
  {#each dropdowns as { id, filter, label, fullRollup, rollup } (id)}
    <Dropdown
      filter={filter}
      label={label}
      fullRollup={fullRollup}
      rollup={rollup}
    />
  {/each}
</div>

<style>
  .filter-bar {
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
    .filter-bar {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 980px) {
    .filter-bar {
      grid-template-columns: repeat(7, 1fr);
    }
  }
</style>