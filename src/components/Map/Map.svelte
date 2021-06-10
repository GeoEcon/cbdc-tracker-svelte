<script>
  import Canvas from '../Canvas.svelte';
  import Country from './Country.svelte';

  export let countries = [];

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
  >
    <Country />
  </Canvas>
</div>

<style>
  .map {
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }
</style>