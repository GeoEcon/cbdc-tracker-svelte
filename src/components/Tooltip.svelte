<script>
  import { fade } from 'svelte/transition';

  import { css } from '../actions/css';

  export let tooltip = {};
  export let maxWidth = 0;

  const padding = 10;

  let height = 0;

  $: width = Math.min(300, maxWidth - 2 * padding);

  $: x = tooltip.x - width / 2 < padding ? width / 2 + padding : tooltip.x + width / 2 > maxWidth - padding ? maxWidth - padding - width / 2 : tooltip.x;
  $: y = tooltip.y + 20;

  $: info = tooltip.info;
</script>

<div
  class="tooltip"
  use:css={{x: x + 'px',
            y: y + 'px',
            width: width + 'px',
            height: height + 'px'}}
  transition:fade={{duration: 200}}
>
  <div class="background"></div>
  <div
    class="content"
    bind:clientHeight={height}
  >
    <div class="header">
      <h3>{info.name}</h3>
    </div>
    {#if (info.title)}
      <div class="title">{info.title}</div>
    {/if}
    {#if (info.categories)}
      <table>
        {#each info.categories as cat}
          <tr>
            <td>{cat.name}</td>
            <td>{cat.definition}</td>
          </tr>
        {/each}
      </table>
    {/if}
    {#if (info.chart_note)}
      <div class="chart-note">
        {info.chart_note}
      </div>
    {/if}
  </div>
</div>

<style>
  .tooltip {
    position: absolute;
    z-index: 9999999;
    left: var(--x);
    top: var(--y);
  }

  .background {
    position: relative;
    width: var(--width);
    height: var(--height);
    background-color: var(--background);
    border: none;
    transform: translateX(-50%);
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 1rem;
    color: var(--darkgray);
    font-family: var(--primFont);
    opacity: 1.0;
    border: 1px solid var(--gray);
    transform: translateX(-50%);
    width:100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .header h3 {
    margin: 0.2rem 0 0.5rem 0;
    font-size: 0.9rem;
  }

  .title {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  table {
    margin: 0.3rem -0.5rem;
    font-size: 0.7rem;
    border: none;
  }

  td {
    padding: 0.5rem;
    line-height: 1.5;
    vertical-align: top;
  }

  td:first-child {
    font-weight: 600;
    white-space: nowrap;
  }

  .chart-note {
    margin: 0.3rem 0;
    font-size: 0.6rem;
    line-height: 1.5;
  }
</style>