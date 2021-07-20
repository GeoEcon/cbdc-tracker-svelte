<script>
  import { isVertical } from '../../stores/device';

  import Dropdown from '../Dropdown/Dropdown.svelte';

  export let statusFilter;
  export let countryFilter;
  export let fullStatusRollup;
  export let statusRollup;
  export let totalCountries = 0;

  function handleClick(id) {
    statusFilter.click(id);
  }

  $: data = $statusFilter.map(item => {
    const fullR = $fullStatusRollup.find(d => d.name === item.name);
    const { n = 0 } = $statusRollup.find(d => d.name === item.name) || {};
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
  on:mousedown|stopPropagation
>
  <div class="countries">
    <h5 class="total">
      <span>{totalCountries}</span> countr{totalCountries === 1 ? 'y' : 'ies'}/Currency union{totalCountries === 1 ? '' : 's'} tracked
    </h5>
    <Dropdown
      filter={countryFilter}
      hideColorBoxes
      showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
    />
  </div>
  <div class="status">
    <h5>Status</h5>
    <ul>
      {#each data as { id, name, color, n } (id)}
        <li
          class:inactive={n === 0}
          on:click|stopPropagation={() => handleClick(id)}
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
</div>

<style>
  .legend {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 800;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0;
    color: var(--darkgray);
    font-family: var(--primFont);
    font-size: 0.9rem;
    background-color: var(--background);
    border: 1px solid var(--gray);
  }

  @media (min-width: 600px) {
    .legend {
      width: 240px;
      min-width: 240px;
      max-width: 240px;
      margin: 2rem 1rem;
    }
  }

  .legend.vertical {
    top: auto;
    bottom: 0;
  }

  .countries {
    width: 100%;
  }

  h5 {
    margin: 0.3rem 0.5rem;
    font-size: 1rem;
  }

  .total {
    margin: 0.2rem 0.5rem;
  }

  .total span {
    font-weight: 600;
  }

  .status {
    margin: 1rem 0 0 0;
    --colorBoxWidth: 12px;
  }

  ul {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;
    list-style-type: none;
  }

  @media (min-width: 600px) {
    ul {
      display: block;
    }
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
    background-color: var(--faintBlue);
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