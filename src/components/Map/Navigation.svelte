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

<div class="navigation">
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
    bottom: auto;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    color: var(--darkgray);
    border: 1px solid var(--gray);
    background-color: var(--background);
  }

  @media (min-width: 600px) {
    .navigation {
      top: auto;
      bottom: 0;
    }
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
    background-color: var(--gray);
  }

  :global(button .fa-icon) {
    fill: var(--darkgray) !important;
  }
</style>