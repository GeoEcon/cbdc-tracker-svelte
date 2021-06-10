<script>
  import { onMount, onDestroy, setContext, createEventDispatcher } from 'svelte';

  import { scaleCanvas } from '../utils/canvas';

  export let width = 0;
  export let height = 0;
  export let center = false;
  export let contextName = 'canvas';

  const dispatch = createEventDispatcher();
  const drawFunctions = [];

  let canvas;
  let ctx;
  let pendingInvalidation = false;
  let frameId;

  function handleMouseMoveClick(e, type) {
    const { layerX: x, layerY: y } = e;
    if (center) {
      dispatch(type, {
        x: x - width / 2,
        y: y - height / 2
      });
    } else {
      dispatch(type, {
        x,
        y
      });
    }
  }

  function update() {
    if (!ctx) return;

    if (center) {
      ctx.clearRect(-width / 2, -height / 2, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
    
    drawFunctions.forEach((fn) => {
      ctx.save();
      fn(ctx);
      ctx.restore();
    });
    
    pendingInvalidation = false;
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
  });

  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });

  $: setContext(contextName, {
    register(fn) {
      drawFunctions.push(fn);
    },
    deregister(fn) {
      drawFunctions.splice(drawFunctions.indexOf(fn), 1);
    },
    invalidate() {
			if (pendingInvalidation) return;
			pendingInvalidation = true;
			frameId = requestAnimationFrame(update);
		}
  });

  $: if (canvas && ctx) scaleCanvas(canvas, ctx, width, height, center);
</script>

<canvas
  bind:this={canvas}
  on:mousemove={(e) => handleMouseMoveClick(e, 'mousemove')}
  on:click={(e) => handleMouseMoveClick(e, 'click')}
/>
<slot />