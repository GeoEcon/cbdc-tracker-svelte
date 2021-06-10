<script>
  import Canvas from '../Canvas.svelte';

  let width = 0;
  let height = 0;
</script>

<div
  class="map"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <Canvas
    width={width}
    height={height}
    contextName="map"
  >
  </Canvas>
</div>

<style>
  .map {
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }
</style>