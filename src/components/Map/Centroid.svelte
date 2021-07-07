<script>
  import { createEventDispatcher } from 'svelte';

  import { css } from '../../actions/css';

  export let dataCountry = {};
  export let color = '#000000';
  export let radius = 14;
  export let opacity = 1.0;
  export let isReactive = true;

  const dispatch = createEventDispatcher();
</script>

<g
  class="centroid"
  class:reactive={isReactive}
  transform="translate({dataCountry.centroid[0]} {dataCountry.centroid[1]})"
  use:css={{opacity}}
  on:mouseenter
  on:mouseleave
  on:touchstart|stopPropagation={() => dispatch('click')}
  on:click
>
  <circle
    class="background"
    cx="0"
    cy="0"
    r={radius}
    fill={color}
  />
  <circle
    class="foreground"
    cx="0"
    cy="0"
    r={radius / 1.5}
    stroke-width={radius / 7}
  />
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

  circle.foreground {
    stroke: var(--background);
    fill: none;
  }
</style>