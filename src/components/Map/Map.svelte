<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select } from 'd3';

  import { mapWidth, mapHeight, initialTransform, mapTransform, projectedData } from '../../stores/map';
  import { data } from '../../stores/data';
  import { dataCountries } from '../../stores/datacountries';
  import { colorCategory, hoveredIds, selectedIds } from '../../stores/selection';
  import styles from '../../utils/styles';

  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
  import Centroid from './Centroid.svelte';
  import HoverTag from './HoverTag.svelte';

  export let zoomExtent = [1, 10];

  const zoom = d3zoom()
    .scaleExtent(zoomExtent)
    .on('zoom', ({ transform }) => mapTransform.set(transform));

  let zoomCatcherElem, zoomCatcher;

  function handleCentroidMouseEnter(id) {
    hoveredIds.add(id);
  }

  function handleCentroidMouseLeave(id) {
    hoveredIds.remove(id);
  }

  function handleCentroidClick(id) {
    selectedIds.add(id);
  }
  
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
          color={$data.find(d => d.name.name === country.name)?.categories[$colorCategory].color}
          strokeColor={styles.gray}
          fallbackFillColor={styles.lightgray}
          fillOpacity={$data.find(d => d.name.name === country.name)?.show ? 1.0 : 0.2}
        />
      {/each}
    {/each}
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
      isReactive={country.show}
      on:mouseenter={() => handleCentroidMouseEnter(country.id)}
      on:mouseleave={() => handleCentroidMouseLeave(country.id)}
      on:click={() => handleCentroidClick(country.id)}
    />
    {/each}
    {#each $hoveredIds as hoveredId (hoveredId)}
      <HoverTag
        data={$dataCountries.find(d => d.id === hoveredId)}
        mapWidth={$mapWidth}
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