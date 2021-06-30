<script>
  import { onMount } from 'svelte';

  import styles from './utils/styles';
  import { css } from './actions/css';
  import { isVertical } from './stores/device';
  import { selectedDatum, selectedId } from './stores/selection';
  import { filterByCategory } from './stores/filter';

  import FilterBar from './components/FilterBar/FilterBar.svelte';
  import Map from './components/Map/Map.svelte';
  import Modal from './components/Modal/Modal.svelte';

  let width;

  function handleModalCategoryClick(e) {
    const { detail: { category, name} } = e;
    filterByCategory(category, name);
  }
  
  onMount(() => {
    selectedId.set(187);
  });

  $: isVertical.set(width < 600);
</script>

<div
  class="component-wrapper"
  bind:clientWidth={width}
  use:css={styles}
>
  <FilterBar />
  <Map />
  {#if ($selectedDatum)}
    <Modal
      datum={$selectedDatum}
      on:categoryclick={handleModalCategoryClick}
      on:close={() => $selectedId = null}
    />
  {/if}
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font02);
    opacity: 1;
    box-sizing: border-box;
  }

  div :global(a) {
    color: var(--primBlue);
    text-decoration: underline;
  }

  div :global(a:hover) {
    text-decoration: none;
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