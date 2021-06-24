<script>
  import { rollups, scaleLinear } from 'd3';

  import { data } from '../../stores/data';
  import { statusBarScale } from '../../stores/scales';
  import { statusLevels, statusColorScale } from '../../utils/scales';

  let width = 0;
  let height = 0;
  let orderedStatusRollup = [];

  $: statusRollup = rollups($data, v => v.length, d => d.categories.new_status.name)
    .map(d => {
      return {
        name: d[0],
        n: d[1],
        color: statusColorScale[d[0]]
      };
    });

  $: if (statusRollup.length) {
    let accumN = 0;
    orderedStatusRollup = statusLevels.map(statusLevel => {
      const curStatus = statusRollup.find(d => d.name === statusLevel.name);
      accumN += curStatus.n;
      return {
        id: statusLevel.id,
        ...curStatus,
        x: $statusBarScale(accumN - curStatus.n),
        width: ($statusBarScale(1) - $statusBarScale(0)) * curStatus.n
      };
    });
  }

  $: console.log(orderedStatusRollup)
</script>

<div
  class="status-bar"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg
    width={width}
    height={height}
    viewBox="0 0 {width} {height}"
  >
    <g class="country-bars">
      {#each orderedStatusRollup as level (level.id)}
        <g
          transform="translate({level.x} 0)"
        >
          <rect
            x="0"
            y="0"
            width={level.width}
            height="30"
            fill={level.color}
          />
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .status-bar {
    width: 100%;
    height: 50px;
    margin: 0 auto;
  }
</style>