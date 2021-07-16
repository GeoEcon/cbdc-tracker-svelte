<script>
  import { fade } from 'svelte/transition';

  import { resetAllFilters } from '../../stores/filter';

  function handleClick() {
    resetAllFilters();
  }
</script>

<div
  class="reset-filters"
  transition:fade={{duration: 200}}
>
  <button on:click={handleClick}>
    Reset filters
  </button>
</div>

<style>
  .reset-filters {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1001;
    margin: 2rem 4rem;
    border: 1px solid var(--gray);
  }

  button {
    padding: 0.5rem;
    color: var(--darkgray);
    font-family: var(--primFont);
    font-size: 1rem;
    background-color: var(--background);
    border: none;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--faintBlue);
  } 
</style>