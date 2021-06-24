<script>
  import { css } from './actions/css';
  import styles from './utils/styles';
  import { isVertical } from './stores/device';
  

  import FilterBar from './components/FilterBar/FilterBar.svelte';
  import Map from './components/Map/Map.svelte';
  import StatusBar from './components/StatusBar/StatusBar.svelte';

  let width;

  $: isVertical.set(width < 600);
</script>

<div
  class="component-wrapper"
  bind:clientWidth={width}
  use:css={styles}
>
  <FilterBar />
  <Map />
  <StatusBar />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font02);
    opacity: 1;
    box-sizing: border-box;
  }

  .component-wrapper {
    width: 100%;
    font-size: 12px;
  }

  @media (min-width: 600px) {
    .component-wrapper {
      font-size: 15px;
    }
  }

  @media (min-width: 980px) {
    .component-wrapper {
      font-size: 16px;
    }
  }

  @media (min-width: 1260px) {
    .component-wrapper {
      font-size: 18px;
    }
  }
  
  @media (min-width: 1950px) {
    .component-wrapper {
      font-size: 20px;
    }
  }
</style>