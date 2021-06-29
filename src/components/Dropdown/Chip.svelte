<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let name = '';
  export let hasCloseButton = true;

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch('close', { id });
  }
</script>

<span
  class="chip-wrapper"
>
  <span
    class="chip-name"
  >
    {name}
  </span>
  {#if (hasCloseButton)}
    <button
      class="chip-icon"
      on:click={handleClose}
    >
      <span>+</span>
    </button>
  {/if}
</span>

<style>
  .chip-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.2rem 0.3rem;
    font-size: 0.9rem;
    background-color: var(--background);
    border: none;
    border-radius: 5px;
    user-select: none;
  }

  button.chip-icon {
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  button.chip-icon:hover {
    font-weight: bold;
  }

  button.chip-icon span {
    display: inline-block;
    padding: 0 0.2rem;
    line-height: 100%;
    transform: rotate(45deg);
  }
</style>