<script>
  import { css } from '../../actions/css';

  export let name = '';
  export let fullRollup;
  export let rollup;
  export let isActive = false;
  export let isSelected = false;
  export let showColorBox = true;

  const colorBoxWidth = '12px';
</script>

<li
  class:active={isActive}
  class:selected={isSelected}
  class:inactive={!rollup}
  on:mouseenter
  on:mouseleave
  on:click
  use:css={{colorBoxWidth}}
>
  <span
    class="color"
    style="background-color: {fullRollup ? fullRollup.color : 'transparent'};
           width: {showColorBox ? colorBoxWidth : '0px'};"
  >
  </span>
  <span class="name">{name}</span>
  {#if (rollup)}
    <span class="number">
      {rollup.n}
    </span>
  {/if}
</li>

<style>
  li {
    display: flex;
    align-items: center;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  li.active {
    background-color: var(--gray);
  }

  li span.color {
    display: inline-block;
    width: var(--colorBoxWidth);
    height: var(--colorBoxWidth);
    margin: 0 0.3rem 0 0;
    border: none;
    border-radius: 2px;
  }

  li.inactive span.color {
    opacity: 0.2;
  }

  li span.name {
    flex: 1;
  }

  li span.number {
    margin: 0 0.5rem;
    color: var(--darkgray);
    font-size: 0.8rem;
  }
</style>