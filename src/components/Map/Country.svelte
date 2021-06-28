<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  export let country = {};
  export let color = '#FFFFFF';
  export let strokeColor = '#000000';
  export let fallbackFillColor = '#FFFFFF';
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    ctx.globalAlpha = 1.0;
    
    ctx.fillStyle = color ? color : fallbackFillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;

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