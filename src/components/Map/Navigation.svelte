<script>
  import { createEventDispatcher } from 'svelte';

  import { plus, minus, expand } from '../../utils/icons';

  import Icon from 'svelte-awesome';

  const dispatch = createEventDispatcher();

  function handleResetClick() {
    dispatch('reset');
  }

  function handlePlusClick() {
    dispatch('plus');
  }

  function handleMinusClick() {
    dispatch('minus');
  }
</script>

<div
  class="navigation"
  on:mousedown|stopPropagation
>
  <button on:click={handleResetClick}>
    <Icon data={expand} />
  </button>
  <button on:click={handlePlusClick}>
    <Icon data={plus} />
  </button>
  <button on:click={handleMinusClick}>
    <Icon data={minus} />
  </button>
</div>

<style>
  .navigation {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 900;
    display: flex;
    flex-direction: column;
    margin: 2rem 1rem;
    color: var(--darkgray);
    border: 1px solid var(--gray);
    background-color: var(--background);
  }

  button {
    margin: 0.3rem;
    padding: 0.2rem;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--faintBlue);
  }

  :global(.navigation button .fa-icon) {
    fill: var(--darkgray) !important;
  }
</style>