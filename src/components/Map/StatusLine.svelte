<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  import { statusLinePath } from '../../utils/paths';

  export let x1 = 0;
  export let y1 = 0;
  export let x2 = 0;
  export let y2 = 0;
  export let color = '#000000';
  export let backgroundColor = '#FFFFFF';
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    ctx.globalAlpha = 0.3;

    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 6;

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
</script>