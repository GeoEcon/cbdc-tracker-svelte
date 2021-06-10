<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { zoomIdentity } from 'd3';

  export let country = {};
  export let transform = zoomIdentity;
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    const { path } = country;
    const p = new Path2D(path);
    ctx.beginPath();
    ctx.stroke(p);
  }

  onMount(() => {
    register(draw);
    invalidate();
    
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);

	onDestroy(invalidate);
</script>