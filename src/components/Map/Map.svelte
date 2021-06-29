<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select } from 'd3';

  import { mapWidth, mapHeight, initialTransform, mapTransform, projectedData } from '../../stores/map';
  import { data } from '../../stores/data';
  import { dataCountries } from '../../stores/datacountries';
  import { statusBarScale } from '../../stores/scales';
  import { colorCategory } from '../../stores/selection';
  import styles from '../../utils/styles';

  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
  import StatusLine from './StatusLine.svelte';
  import Centroid from './Centroid.svelte';
import { every } from 'lodash-es';

  export let zoomExtent = [1, 10];

  const zoom = d3zoom()
    .scaleExtent(zoomExtent)
    .on('zoom', ({ transform }) => mapTransform.set(transform));

  let zoomCatcherElem, zoomCatcher;
  
  onMount(() => {
    zoomCatcher = select(zoomCatcherElem);
    zoomCatcher.call(zoom);
  });

  $: if(zoomCatcher) zoomCatcher.call(zoom.transform, $initialTransform);
</script>

<div
  class="map"
  bind:clientWidth={$mapWidth}
  bind:clientHeight={$mapHeight}
>
  <Canvas
    width={$mapWidth}
    height={$mapHeight}
    center={false}
    --position="absolute"
    --z-index="0"
  >
    {#each $projectedData as projection, i}
      {#each projection as country (`${i}_${country.id}`)}
        <Country
          path={country.path}
          color={$data.find(d => d.name === country.name)?.categories[$colorCategory].color}
          strokeColor={styles.gray}
          fallbackFillColor={styles.lightgray}
          fillOpacity={$data.find(d => d.name === country.name)?.show ? 1.0 : 0.2}
        />
      {/each}
    {/each}
    <!-- {#if (!$data.every(d => d.show))}
      {#each $dataCountries as country (country.orderId)}
        <StatusLine
          x1={country.centroid[0]}
          y1={country.centroid[1]}
          x2={$statusBarScale(country.orderId)}
          y2={$mapHeight}
          color={country.categories[$colorCategory].color}
          opacity={country.lineVisible ? 0.3 : 0}
        />
      {/each}
    {/if} -->
  </Canvas>
  <svg
    width={$mapWidth}
    height={$mapHeight}
    viewBox="0 0 {$mapWidth} {$mapHeight}"
    bind:this={zoomCatcherElem}
  >
    {#each $dataCountries as country (country.orderId)}
      <Centroid
        dataCountry={country}
        color={country.categories[$colorCategory].color}
        opacity={country.show ? 1 : 0.3}
      />
    {/each}
  </svg>
</div>

<style>
  .map {
    position: relative;
    width: 100%;
    height: 180vw;
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