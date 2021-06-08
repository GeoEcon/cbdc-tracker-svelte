<script>
  import { onMount } from 'svelte';
  import { css } from './actions/css';
  import * as styles from './utils/styles';
  import { loadTrackerData, loadMapData } from './utils/load';
  import { rawData, mapData } from './stores/data';
  

  import FilterBar from './components/FilterBar/FilterBar.svelte';
  import Map from './components/Map/Map.svelte';
  import Alluvial from './components/Alluvial/Alluvial.svelte';

  export let trackerDataPath = 'data/tracker.csv';
  export let mapDataPath = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

  onMount(async () => {
    // load initial data
    rawData.set(await loadTrackerData(trackerDataPath));

    // load map data
    mapData.set(await loadMapData(mapDataPath));
  });
</script>

<div
  class="component-wrapper"
  use:css={styles}
>
  <FilterBar />
  <Map />
  <Alluvial />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font02);
    opacity: 1;
    box-sizing: border-box;
  }
</style>