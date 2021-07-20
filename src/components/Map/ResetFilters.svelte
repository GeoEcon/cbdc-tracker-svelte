<script>
  import { fade } from 'svelte/transition';

  import { resetAllFilters } from '../../stores/filter';

  function handleClick() {
    resetAllFilters();
  }
</script>

<div
  class="reset-filters"
  on:mousedown|stopPropagation
  transition:fade={{duration: 200}}
>
  <button on:click|stopPropagation={handleClick}>
    Reset filters
  </button>
</div>

<style>
  .reset-filters {
    position: absolute;
    left: 0;
    right: auto;
    top: 0;
    z-index: 1001;
    margin: 2rem 1rem;
    background-color: var(--background);
    border: 1px solid var(--primOrange);
  }

  @media (min-width: 600px) {
    .reset-filters {
      left: auto;
      right: 0;
      margin: 2rem 4rem;
    }
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
    color: var(--primBlack);
    background-color: var(--faintBlue);
  } 
</style>