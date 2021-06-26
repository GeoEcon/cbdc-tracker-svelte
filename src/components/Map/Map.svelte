<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select } from 'd3';

  import { mapWidth, mapHeight, mapTransform, projectedData } from '../../stores/map';
  import { data } from '../../stores/data';
  import { statusBarScale } from '../../stores/scales';
  import { orderedStatusRollup } from '../../stores/statusbar';
  import styles from '../../utils/styles';

  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
  import StatusLines from './StatusLines.svelte';
import { transform } from 'lodash-es';

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
    --position="absolute"
    --z-index="0"
  >
    {#each $projectedData as projection, i}
      {#each projection as country (`${i}_${country.id}`)}
        <Country
          country={country}
          color={$data.find(d => d.name === country.name)?.categories.new_status.color}
          strokeColor={styles.gray}
          fallbackFillColor={styles.lightgray}
          transform={$mapTransform}
        />
      {/each}
    {/each}
  </Canvas>
  <svg
    width={$mapWidth}
    height={$mapHeight}
    viewBox="0 0 {$mapWidth} {$mapHeight}"
    bind:this={zoomCatcher}
  >
    <StatusLines
      data={$data}
      projectedData={$projectedData}
      orderedStatusRollup={$orderedStatusRollup}
      statusBarScale={$statusBarScale}
      mapHeight={$mapHeight}
    />
  </svg>
</div>

<style>
  .map {
    position: relative;
    width: 100%;
    height: 200vw;
    overflow: hidden;
  }
  
  @media (min-width: 600px) {
    .map {
      height: 50vw;
    }
  }

  svg {
    position: absolute;
    z-index: 10;
  }
</style>