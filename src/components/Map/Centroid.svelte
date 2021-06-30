<script>
  import { css } from '../../actions/css';

  export let dataCountry = {};
  export let color = '#000000';
  export let radius = 14;
  export let opacity = 1.0;
  export let reactive = true;
</script>

<g
  class="centroid"
  transform="translate({dataCountry.centroid[0]} {dataCountry.centroid[1]})"
  use:css={{opacity}}
  on:mouseenter
  on:mouseleave
  on:click
  style="pointer-events: {reactive ? 'all' : 'none'};"
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
    cursor: pointer;
    transition: all 0.2s;
  }

  circle {
    stroke: none;
  }

  circle.foreground {
    stroke: var(--background);
    fill: none;
  }
</style>