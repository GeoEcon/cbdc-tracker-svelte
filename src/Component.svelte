<script>
  import styles from './utils/styles';
  import { css } from './actions/css';
  import { isVertical } from './stores/device';
  import { selectedDatum, selectedId } from './stores/selection';
  import { filterByCategory } from './stores/filter';

  import FilterBar from './components/FilterBar/FilterBar.svelte';
  import Logo from './components/Logo.svelte';
  import Map from './components/Map/Map.svelte';
  import Modal from './components/Modal/Modal.svelte';

  let width = 0;
  let height = 0;

  function handleModalCategoryClick(e) {
    const { detail: { category, name} } = e;
    filterByCategory(category, name);
  }

  function handleParentMessenger() {
    const message = {
      height,
      width
    };

	  window.top.postMessage(message, "*");
  }

  $: isVertical.set(width < 600);
</script>

<svelte:window on:load={handleParentMessenger} on:resize={handleParentMessenger} />

<div
  class="component-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  use:css={styles}
>
  <FilterBar />
  <Logo />
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
    width: calc(100% - 1rem);
    margin: 0.5rem;
    font-size: 12px;
    border: 1px solid var(--gray);
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