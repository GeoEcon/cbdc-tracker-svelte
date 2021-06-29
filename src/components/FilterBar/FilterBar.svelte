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
      rollup: $statusRollup
    },
    {
      filter: useCaseFilter,
      label: 'Use case',
      rollup: $useCaseRollup
    },
    {
      filter: technologyFilter,
      label: 'Technology',
      rollup: $technologyRollup
    },
    {
      filter: architectureFilter,
      label: 'Architecture',
      rollup: $architectureRollup
    },
    {
      filter: infrastructureFilter,
      label: 'Infrastructure',
      rollup: $infrastructureRollup
    },
    {
      filter: accessFilter,
      label: 'Access',
      rollup: $accessRollup
    },
    {
      filter: countryFilter,
      label: 'Country',
      rollup: [] //$countryRollup
    }
  ].map((d, i) => ({...d, id: i}));
</script>

<div class="filter-bar">
  {#each dropdowns as { id, filter, label, rollup } (id)}
    <Dropdown
      filter={filter}
      label={label}
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