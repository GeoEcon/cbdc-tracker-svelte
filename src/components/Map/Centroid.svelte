<script>
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';

  import { css } from '../../actions/css';

  export let dataCountry = {};
  export let color = '#000000';
  export let radius = 14;
  export let opacity = 1.0;
  export let offset = [0, 0];
  export let isCluster = false;
  export let isReactive = true;
  export let inverted = false;

  const tOffset = tweened(null, { duration: 200 });
  
  let deactivated = false;

  $: tOffset.set(offset);
  $: deactivated = offset[0] !== 0 && offset[1] !== 0;
</script>

<g
  class="centroid"
  class:reactive={isReactive && !deactivated}
  class:deactivated
  class:inverted
  transform="translate({dataCountry.centroid[0] + $tOffset[0]} {dataCountry.centroid[1] + $tOffset[1]})"
  use:css={{opacity, color}}
  in:fade={{delay: 200}}
  out:fade={{duration: 0}}
  on:mouseenter
  on:mouseleave
  on:touchstart|stopPropagation
  on:touchend|stopPropagation
  on:click|stopPropagation
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
  {#if (isCluster)}
    <circle
      class="foreground"
      cx="0"
      cy="0"
      r={radius / 1.2}
      stroke-width={radius / 15}
    />
    <circle
      class="foreground"
      cx="0"
      cy="0"
      r={radius / 2}
      stroke-width={radius / 15}
    />
    <circle
      class="foreground"
      cx="0"
      cy="0"
      r={radius / 2.5}
      stroke-width={radius / 15}
    />
  {/if}
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