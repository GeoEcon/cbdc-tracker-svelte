<script>
  import { css } from '../../actions/css';

  export let dataCountry = {};
  export let color = '#000000';
  export let radius = 14;
  export let opacity = 1.0;
  export let isReactive = true;
  export let inverted = false;
</script>

<g
  class="centroid"
  class:reactive={isReactive}
  class:inverted
  transform="translate({dataCountry.centroid[0]} {dataCountry.centroid[1]})"
  use:css={{opacity, color}}
  on:mouseenter
  on:mouseleave
  on:touchstart|stopPropagation
  on:touchend|stopPropagation
  on:click
>
  <circle
    class="background"
    cx="0"
    cy="0"
    r={radius}
  />
  <circle
    class="foreground"
    cx="0"
    cy="0"
    r={radius / 1.5}
    stroke-width={radius / 7}
  />
  {#if (inverted)}
    <circle
      class="foreground"
      cx="0"
      cy="0"
      r={radius / 2.2}
      stroke-width={radius / 7}
    />
  {/if}
</g>

<style>
  g {
    opacity: var(--opacity);
    pointer-events: none;
  }

  g.reactive {
    cursor: pointer;
    pointer-events: all;
  }

  circle {
    stroke: none;
  }

  circle.background {
    fill: var(--color);
  }

  .inverted circle.background {
    fill: var(--background);
  }

  circle.foreground {
    stroke: var(--background);
    fill: none;
  }

  .inverted circle.foreground {
    stroke: var(--color);
  }
</style>