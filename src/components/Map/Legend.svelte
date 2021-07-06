<script>
  import { isVertical } from '../../stores/device';

  export let filter;
  export let label;
  export let fullRollup;
  export let rollup;

  function handleClick(id) {
    filter.click(id);
  }

  $: data = $filter.map(item => {
    const fullR = $fullRollup.find(d => d.name === item.name);
    const { n = 0 } = $rollup.find(d => d.name === item.name) || {};
    return {
      ...item,
      ...fullR,
      n
    };
  });
</script>

<div
  class="legend"
  class:vertical={$isVertical}
>
  <h5>{label}</h5>
  <ul>
    {#each data as { id, name, color, n } (id)}
      <li
        class:inactive={n === 0}
        on:click={() => handleClick(id)}
      >
        <span
          class="color"
          style="background-color: {color};"
        >
        </span>
        <span class="number">
          {n ? n : ''}
        </span>
        <span class="name">
          {name}
        </span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .legend {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 800;
    margin: 1rem 0.5rem;
    color: var(--darkgray);
    font-family: var(--primFont);
    font-size: 0.9rem;
    background-color: var(--background);
    --colorBoxWidth: 12px;
  }

  .legend.vertical {
    top: auto;
    bottom: 0;
  }

  h5 {
    margin: 0.5rem;
    font-size: 1rem;
  }

  ul {
    list-style-type: none;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
  }

  li.inactive {
    opacity: 0.2;
  }

  li:hover, li.inactive:hover {
    opacity: 1.0;
    background-color: var(--lightgray);
  }

  .color {
    display: inline-block;
    width: var(--colorBoxWidth);
    height: var(--colorBoxWidth);
    margin: 0 0.3rem 0 0;
    border: none;
    border-radius: 2px;
  }

  .number {
    min-width: 1rem;
    margin: 0 0.3rem;
    font-size: 0.85rem;
    text-align: right;
  }
</style>