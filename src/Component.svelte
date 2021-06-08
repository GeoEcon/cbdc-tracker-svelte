<script>
  import { onMount } from 'svelte';
  import { loadTrackerData, loadMapData } from './utils/load';
  import { rawData, mapData } from './stores/data';

  export let trackerDataPath = 'data/tracker.csv';
  export let mapDataPath = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

  onMount(async () => {
    // load initial data
    rawData.set(await loadTrackerData(trackerDataPath));

    // load map data
    mapData.set(await loadMapData(mapDataPath));
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