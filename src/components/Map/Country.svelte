<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { zoomIdentity } from 'd3';

  export let country = {};
  export let colors = ['#FFFFFF'];
  export let strokeColor = '#000000';
  export let fallbackFillColor = '#FFFFFF';
  export let transform = zoomIdentity;
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    ctx.fillStyle = colors ? colors[0] : fallbackFillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1 / (transform.k || 1);

    const { path } = country;
    const p = new Path2D(path);
    ctx.beginPath();
    ctx.fill(p);
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