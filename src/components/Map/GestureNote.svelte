<script>
  import { fade } from 'svelte/transition';

  import { shift } from '../../utils/icons';

  import Icon from 'svelte-awesome';

  export let mode = 'mobile';
</script>

<div
  class="gesture-note"
  transition:fade
>
  <div class="content">
    {#if (mode === 'mobile')}
      Use two fingers to pan and zoom the map.
    {:else if (mode === 'desktop')}
      <Icon data={shift} /> Press Shift to pan and zoom the map. <Icon data={shift} />
    {/if}
  </div>
</div>

<style>
  .gesture-note {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 100;
    pointer-events: none;
  }

  .content {
    position: relative;
    padding: 1rem;
    color: var(--darkgray);
    font-family: var(--primFont);
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.3;
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--background);
  }
</style>