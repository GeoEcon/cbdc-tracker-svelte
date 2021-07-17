<script>
  import { onMount } from 'svelte';
  import { zoom as d3zoom, select, zoomIdentity } from 'd3';

  import { mapWidth, mapHeight, initialTransform, mapTransform, projectedData, clusters } from '../../stores/map';
  import { data } from '../../stores/data';
  import { dataCountries, dataClusters } from '../../stores/datacountries';
  import { colorCategory } from '../../stores/colorcategory';
  import { hoveredIds, selectedId } from '../../stores/selection';
  import { statusFilter, filterByCategory, countryFilter, anyFilterActive, resetAllFilters } from '../../stores/filter';
  import { fullStatusRollup, statusRollup, totalCountries } from '../../stores/aggregation';
  import { isVertical } from '../../stores/device';
  import styles from '../../utils/styles';

  import Navigation from './Navigation.svelte';
  import ResetFilters from './ResetFilters.svelte';
  import Legend from './Legend.svelte';
  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';
  import Centroid from './Centroid.svelte';
  import HoverTag from './HoverTag.svelte';
  import GestureNote from './GestureNote.svelte';

  export let zoomExtent = [1, 25];

  let isZoomed = false;

  const zoom = d3zoom()
    .scaleExtent(zoomExtent)
    .filter((e) => {
      if (e.touches && e.touches.length <= 1) return false;
      return true;
    })
    .on('start', () => isZoomed = true)
    .on('zoom', (e) => {
      mapTransform.set(e.transform);
    })
    .on('end', () => isZoomed = false);

  let zoomCatcherElem, zoomCatcher;
  let showGestureNote = false;
  let numGestureNotes = 0;

  function handleMapTouchend(e) {
    if (numGestureNotes < 2 && e.touches && e.touches.length <= 1) {
      showGestureNote = true;
      numGestureNotes++;
      setTimeout(() => showGestureNote = false, 2000);
      return;
    }
    showGestureNote = false;
  }
  
  function zoomReset({animation = true} = {}) {
    if (!zoomCatcher) return;
    if (animation) {
      zoomCatcher.transition().duration(400).call(zoom.transform, $initialTransform);
    } else {
      zoomCatcher.call(zoom.transform, $initialTransform);
    }
  }

  function zoomPlus() {
    if (!zoomCatcher) return;
    zoomCatcher.transition().duration(400).call(zoom.scaleBy, 2);
  }

  function zoomMinus() {
    if (!zoomCatcher) return;
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

  function handleCentroidClick(e, id) {
    if (e.touches && e.touches.length > 1) return;
    e.preventDefault();
    e.stopPropagation();
    selectedId.set(id);
  }

  function handleHoverTagClick(e) {
    const { detail: { category, name } } = e;
    resetAllFilters();
    filterByCategory(category, name);
  }

  function handleClusterClick(e, centroid) {
    // const scale = 1;
    // const dx = centroid[0];
    // const dy = centroid[1];
    // console.log(dx, dy)
    // zoomCatcher
    //   .transition()
    //   .duration(400)
    //   .call(zoom.transform,
    //         zoomIdentity
    //           .scale(scale)
    //           .translate(dx, dy));
  }
  
  onMount(() => {
    zoomCatcher = select(zoomCatcherElem);
    zoomCatcher.call(zoom);
    zoomReset({animation: false});
  });

  $: if ($data && !$isVertical && $mapWidth && $mapHeight) zoomReset();

  // $: console.log($dataClusters)
</script>

<div
  class="map"
  bind:clientWidth={$mapWidth}
  bind:clientHeight={$mapHeight}
  on:touchend={handleMapTouchend}
>
  {#if (showGestureNote)}
    <GestureNote />
  {/if}
  <Navigation
    on:reset={zoomReset}
    on:plus={zoomPlus}
    on:minus={zoomMinus}
  />
  {#if ($anyFilterActive)}
    <ResetFilters />
  {/if}
  <Legend
    statusFilter={statusFilter}
    countryFilter={countryFilter}
    fullStatusRollup={fullStatusRollup}
    statusRollup={statusRollup}
    totalCountries={$totalCountries}
  />
  <Canvas
    width={$mapWidth}
    height={$mapHeight}
    center={false}
    --position="absolute"
    --z-index="0"
  >
    {#each $projectedData as projection, i}
      {#each projection as country}
        <Country
          path={country.path}
          color={$data.find(d => d.name.name === country.name)?.categories[$colorCategory].color}
          strokeColor={styles.gray}
          fallbackFillColor={styles.lightgray}
          fillOpacity={$data.find(d => d.name.name === country.name)?.show ? 1.0 : 0.1}
          mode={country.status === 'country' ? 'area' : 'stroke'}
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
          opacity={country.show ? 1 : 0}
          isReactive={country.show}
          inverted={country.status === 'region'}
          offset={$mapTransform.k > 5 ? [0, 0] : country.offset}
          on:mouseenter={(e) => handleCentroidMouseEnter(e, country.id)}
          on:mouseleave={(e) => handleCentroidMouseLeave(e, country.id)}
          on:touchstart={(e) => handleCentroidClick(e, country.id)}
          on:click={(e) => handleCentroidClick(e, country.id)}
        />
    {/each}
    {#each $hoveredIds as hoveredId (hoveredId)}
      <HoverTag
        data={$dataCountries.find(d => d.id === hoveredId)}
        mapWidth={$mapWidth}
        mapHeight={$mapHeight}
        on:mouseenter={(e) => handleCentroidMouseEnter(e, hoveredId)}
        on:mouseleave={(e) => handleCentroidMouseLeave(e, hoveredId)}
        on:tagclick={handleHoverTagClick}
      />
    {/each}

    {#each $dataClusters as cluster (cluster.id)}
      {#if ($mapTransform.k < 5)}
        <Centroid
          dataCountry={cluster}
          color={cluster.color}
          opacity={cluster.show ? 1 : 0}
          isReactive={cluster.show}
          isCluster
          on:click={(e) => handleClusterClick(e, cluster.centroid)}
        />
      {/if}
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