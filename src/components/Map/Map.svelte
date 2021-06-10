<script>
  import { mapWidth, mapHeight, projectedData } from '../../stores/map';

  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
</script>

<div
  class="map"
  bind:clientWidth={$mapWidth}
  bind:clientHeight={$mapHeight}
>
  <Canvas
    width={$mapWidth}
    height={$mapHeight}
  >
    {#each $projectedData as projection, i}
      {#each projection as country (`${i}_${country.id}`)}
        <Country
          country={country}
        />
      {/each}
    {/each}
  </Canvas>
</div>

<style>
  .map {
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }
</style>