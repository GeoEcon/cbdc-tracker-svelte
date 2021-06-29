<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';

  import { statusLinePath } from '../../utils/paths';

  export let x1 = 0;
  export let y1 = 0;
  export let x2 = 0;
  export let y2 = 0;
  export let color = '#000000';
  export let backgroundColor = '#FFFFFF';
  export let opacity = 0;
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  const tOpacity = tweened(opacity, {
    duration: 200
  });

  function draw(ctx) {
    ctx.globalAlpha = $tOpacity;

    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 5;

    const pBackground = new Path2D(statusLinePath(x1, y1, x2, y2));
    ctx.beginPath();
    ctx.stroke(pBackground);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const p = new Path2D(statusLinePath(x1, y1, x2, y2));
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

  $: tOpacity.set(opacity);
</script>