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
    user-select: none;
  }

  button.chip-icon {
    height: 100%;
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  button.chip-icon span {
    display: inline-block;
    height: 100%;
    padding: 0 0.2rem;
    line-height: 100%;
    transform: rotate(45deg);
  }
</style>