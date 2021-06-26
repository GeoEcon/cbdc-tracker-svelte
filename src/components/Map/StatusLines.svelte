<script>
  import { fade } from 'svelte/transition';
  import { sortBy, difference } from 'lodash-es';

  import { isDefined } from '../../utils/logic';
  import { statusLinePath } from '../../utils/paths';

  export let data = [];
  export let projectedData = [];
  export let orderedStatusRollup = [];
  export let statusBarScale;
  export let category = 'new_status';
  export let mapHeight = 0;

  $: availableCountries = data.map(d => d.name);

  $: countries = sortBy(projectedData
    .flat()
    .filter(d => isDefined(d.path))
    .filter(d => availableCountries.includes(d.name))
    .map(d => {
      const datum = data.find(dd => dd.name === d.name);
      return {
        ...d,
        ...datum
      };
    }),
    [
      d => orderedStatusRollup.map(dd => dd.name).indexOf(d.categories[category].name),
      d => d.centroid[0]
    ])
    .map((d, i) => ({...d, orderId: i + 0.5}));


    // $: console.log(difference(availableCountries, projectedData.flat().filter(d => isDefined(d.path)).map(d => d.name)));
</script>

{#if (projectedData.length === 1)}
  <g
    class="status-lines"
    transition:fade
  >
    {#each countries as country (country.id)}
      <g class="status-line">
        <path
          class="background"
          d={statusLinePath(...country.centroid, statusBarScale(country.orderId), mapHeight)}
          stroke={country.categories[category].color}
        />
        <path
          d={statusLinePath(...country.centroid, statusBarScale(country.orderId), mapHeight)}
          stroke={country.categories[category].color}
        />
      </g>
    {/each}
  </g>
{/if}

<style>
  g.status-line {
    opacity: 0.5;
  }

  path {
    stroke-width: 2;
    fill: none;
  }

  path.background {
    stroke: var(--background);
    stroke-width: 4;
  }
</style>