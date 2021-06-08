<script>
  import { onMount } from 'svelte';
  import { loadTrackerData } from './utils/load';
  import { rawData } from './stores/data';
  import { initFilters, statusFilter } from './stores/filter';

  export let dataPath = 'data/tracker.csv';

  onMount(async () => {
    // load initial data
    rawData.set(await loadTrackerData(dataPath));

    // initialize filters
    initFilters($rawData);
  });
</script>

<div class="component-wrapper"></div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font02);
    opacity: 1;
    box-sizing: border-box;
  }
</style>