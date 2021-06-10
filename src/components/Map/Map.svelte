<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select } from 'd3';

  import { mapWidth, mapHeight, mapTransform, projectedData } from '../../stores/map';

  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';

  export let zoomExtent = [1, 10];

  const zoom = d3zoom()
    .scaleExtent(zoomExtent)
    .on('zoom', ({ transform }) => mapTransform.set(transform));

  let zoomCatcher;
  
  onMount(() => {
    select(zoomCatcher).call(zoom);
  });
</script>

<div
  class="map"
  bind:clientWidth={$mapWidth}
  bind:clientHeight={$mapHeight}
>
  <Canvas
    width={$mapWidth}
    height={$mapHeight}
    transform={$mapTransform}
    --position="absolute"
    --z-index="0"
  >
    {#each $projectedData as projection, i}
      {#each projection as country (`${i}_${country.id}`)}
        <Country
          country={country}
          transform={$mapTransform}
        />
      {/each}
    {/each}
  </Canvas>
  <svg
    width={$mapWidth}
    height={$mapHeight}
    bind:this={zoomCatcher}
  >

  </svg>
</div>

<style>
  .map {
    position: relative;
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }

  svg {
    position: absolute;
    z-index: 10;
  }
</style>