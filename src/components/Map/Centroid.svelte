<script>
  export let dataCountry = {};
  export let color = '#000000';
  export let radius = 12;
</script>

<g
  class="centroid"
  transform="translate({dataCountry.centroid[0]} {dataCountry.centroid[1]})"
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
  circle {
    stroke: none;
  }

  circle.foreground {
    stroke: var(--background);
    fill: none;
  }
</style>