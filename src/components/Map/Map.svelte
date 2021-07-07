<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select, zoomIdentity } from 'd3';

  import { mapWidth, mapHeight, initialTransform, mapTransform, projectedData } from '../../stores/map';
  import { data } from '../../stores/data';
  import { dataCountries } from '../../stores/datacountries';
  import { colorCategory } from '../../stores/colorcategory';
  import { hoveredIds, selectedId } from '../../stores/selection';
  import { statusFilter, filterByCategory } from '../../stores/filter';
  import { fullStatusRollup, statusRollup } from '../../stores/aggregation';
  import styles from '../../utils/styles';

  import Navigation from './Navigation.svelte';
  import Legend from './Legend.svelte';
  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
  import Centroid from './Centroid.svelte';
  import HoverTag from './HoverTag.svelte';

  export let zoomExtent = [1, 10];

  const zoom = d3zoom()
    .scaleExtent(zoomExtent)
    .filter((e) => {
      if (e.touches && e.touches.length <= 1) return false;
      return true;
    })
    .on('zoom', (e) => {
      mapTransform.set(e.transform);
    });

  let zoomCatcherElem, zoomCatcher;
  
  function handleZoomReset() {
    zoomCatcher.transition().duration(400).call(zoom.transform, $initialTransform);
  }

  function handleZoomPlus() {
    zoomCatcher.transition().duration(400).call(zoom.scaleBy, 2);
  }

  function handleZoomMinus() {
    zoomCatcher.transition().duration(400).call(zoom.scaleBy, 0.5);
  }

  function handleCentroidMouseEnter(e, id) {
    if (e.touches) return;
    e.preventDefault();
    e.stopPropagation();
    hoveredIds.add(id);
  }

  function handleCentroidMouseLeave(e, id) {
    if (e.touches) return;
    e.preventDefault();
    e.stopPropagation();
    hoveredIds.remove(id);
  }

  function handleCentroidClick(id) {
    selectedId.set(id);
  }

  function handleHoverTagClick(e) {
    const { detail: { category, name } } = e;
    filterByCategory(category, name);
  }
  
  onMount(() => {
    zoomCatcher = select(zoomCatcherElem);
    zoomCatcher.call(zoom);
  });

  $: if (zoomCatcher) zoomCatcher.call(zoom.transform, $initialTransform);
</script>

<div
  class="map"
  bind:clientWidth={$mapWidth}
  bind:clientHeight={$mapHeight}
>
  <Navigation
    on:reset={handleZoomReset}
    on:plus={handleZoomPlus}
    on:minus={handleZoomMinus}
  />
  <Legend
    filter={statusFilter}
    label="Status"
    fullRollup={fullStatusRollup}
    rollup={statusRollup}
  />
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
      on:mouseenter={(e) => handleCentroidMouseEnter(e, country.id)}
      on:mouseleave={(e) => handleCentroidMouseLeave(e, country.id)}
      on:click={() => handleCentroidClick(country.id)}
    />
    {/each}
    {#each $hoveredIds as hoveredId (hoveredId)}
      <HoverTag
        data={$dataCountries.find(d => d.id === hoveredId)}
        on:mouseenter={(e) => handleCentroidMouseEnter(e, hoveredId)}
        on:mouseleave={(e) => handleCentroidMouseLeave(e, hoveredId)}
        on:tagclick={handleHoverTagClick}
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