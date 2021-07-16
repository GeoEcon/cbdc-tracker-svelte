<script>
  import styles from './utils/styles';
  import { css } from './actions/css';
  import { isVertical } from './stores/device';
  import { tooltip } from './stores/definitions';
  import { selectedDatum, selectedId } from './stores/selection';
  import { resetAllFilters, filterByCategory } from './stores/filter';

  import FilterBar from './components/FilterBar/FilterBar.svelte';
  import Logo from './components/Logo.svelte';
  import Map from './components/Map/Map.svelte';
  import Tooltip from './components/Tooltip.svelte';
  import Modal from './components/Modal/Modal.svelte';

  let width = 0;
  let height = 0;

  function handleModalCategoryClick(e) {
    const { detail: { category, name} } = e;
    resetAllFilters();
    filterByCategory(category, name);
  }

  function sendDimensions(width, height) {
    const message = {
      height,
      width
    };

	  window.top.postMessage(message, "*");
  }

  $: isVertical.set(width < 600);
  $: if ($selectedDatum) tooltip.set(null);
  $: sendDimensions(width, height);
</script>

<div
  class="component-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  use:css={styles}
>
  <FilterBar />
  <Logo />
  <Map />
  {#if ($tooltip)}
    <Tooltip
      tooltip={$tooltip}
      maxWidth={width}
    />
  {/if}
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
    position: relative;
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