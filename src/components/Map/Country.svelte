<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';

  export let path = 'M0 0';
  export let color = '#FFFFFF';
  export let strokeColor = '#000000';
  export let fallbackFillColor = '#FFFFFF';
  export let fillOpacity = 1.0;
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  const tFillOpacity = tweened(fillOpacity, {
    duration: 200
  });

  function draw(ctx) {
    
    ctx.fillStyle = color ? color : fallbackFillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    
    const p = new Path2D(path);
    ctx.beginPath();

    ctx.globalAlpha = $tFillOpacity;
    ctx.fill(p);

    ctx.globalAlpha = 1.0;
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

  $: tFillOpacity.set(fillOpacity);
</script>