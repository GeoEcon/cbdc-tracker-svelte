<script>
  import { orderedStatusRollup } from '../../stores/statusbar';

  let width = 0;
  let height = 0;
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
      {#each $orderedStatusRollup as level (level.id)}
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