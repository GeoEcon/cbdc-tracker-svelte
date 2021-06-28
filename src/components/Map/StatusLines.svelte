<script>
  import { sortBy } from 'lodash-es';

  import { isDefined } from '../../utils/logic';
import Country from './Country.svelte';

  import StatusLine from './StatusLine.svelte';

  export let data = [];
  export let projectedData = [];
  export let orderedStatusRollup = [];
  export let statusBarScale;
  export let category = 'new_status';
  export let mapWidth = 0;
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
    .map((d, i) => {
      return {
        ...d,
        lineVisible: d.centroid[0] > 0 && d.centroid[0] < mapWidth && d.centroid[1] > 0 && d.centroid[1] < mapHeight,
        orderId: i + 0.5
      };
    });
</script>


{#each countries as country (country.orderId)}
  <StatusLine
    x1={country.centroid[0]}
    y1={country.centroid[1]}
    x2={statusBarScale(country.orderId)}
    y2={mapHeight}
    color={country.categories[category].color}
    opacity={country.lineVisible ? 0.3 : 0}
  />
{/each}