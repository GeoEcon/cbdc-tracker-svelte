<script>
  export let rollup = [];
  export let fullRollup = [];

  $: combinedRollup = fullRollup.map(full => {
    const { percent = 0 } = rollup.find(d => d.name === full.name) || {};
    return {
      ...full,
      percent
    };
  });
</script>

<div class="bar-chart">
  {#each combinedRollup as { name, percent, color } (name)}
    <span
      class="bar"
      style="width: {percent}%; background-color: {color};"
    >
    </span>
  {/each}
</div>

<style>
  .bar-chart {
    display: flex;
    width: 100%;
    height: calc(0.2 * var(--inputHeight));
    background-color: var(--background);
  }

  .bar {
    display: inline-block;
    height: 100%;
    transition: width 0.2s;
  }
</style>