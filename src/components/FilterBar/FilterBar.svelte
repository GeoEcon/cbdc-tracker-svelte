<script>
  import { filter } from 'lodash-es';
import {
    statusFilter,
    useCaseFilter,
    technologyFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter } from '../../stores/filter';

    import Dropdown from '../Dropdown/Dropdown.svelte';

    $: dropdowns = [
      {
        filter: statusFilter,
        label: 'Status'
      },
      {
        filter: useCaseFilter,
        label: 'Use case'
      },
      {
        filter: technologyFilter,
        label: 'Technology'
      },
      {
        filter: architectureFilter,
        label: 'Architecture'
      },
      {
        filter: infrastructureFilter,
        label: 'Infrastructure'
      },
      {
        filter: accessFilter,
        label: 'Access'
      }
    ].map((d, i) => ({...d, id: i}));
</script>

<div class="filter-bar">
  {#each dropdowns as { id, filter, label } (id)}
    <Dropdown
      filter={filter}
      label={label}
    />
  {/each}
</div>

<style>
  .filter-bar {
    display: grid;
    width: 100%;
    padding: 1rem;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 0.3rem;
    row-gap: 0.3rem;
    align-items: stretch;
    justify-items: stretch;
    justify-content: end;
  }
</style>