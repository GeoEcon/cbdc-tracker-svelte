<script>
  import Icon from 'svelte-awesome';

  import { plus, minus } from '../../utils/icons';

  export let label = '';
  export let expandable = false;
  export let expanded = false;
</script>

<button
  class="filter-title"
  class:expandable
  on:click={() => expanded = !expanded}
>
  {label}
  {#if (expandable)}
    <span><Icon data={expanded ? minus : plus} scale="0.5" /></span>
  {/if}
</button>

<style>
  button.filter-title {
    display: flex;
    align-items: center;
    margin: 0.2rem 0 0 1rem;
    color: var(--darkgray);
    font-family: var(--primFont);
    font-size: 1rem;
    font-weight: 700;
    background: none;
    border: none;
    outline: none;
  }

  button.expandable {
    cursor: pointer;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin: 0 0.4rem;
    padding: 0 0.1rem;
    line-height: 0.1;
    border: 1px solid var(--darkgray);
  }

  :global(.filter-title .fa-icon) {
    fill: var(--darkgray) !important;
  }
</style>
