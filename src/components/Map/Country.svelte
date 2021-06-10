<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  export let country = {};
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
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