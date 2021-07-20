<script>
  import { twitter, copy } from '../../utils/icons';
  import { filterUrl } from '../../stores/share';
  
  import Icon from 'svelte-awesome';

  export let inverted = false;

  async function copyToClipBoard(url) {
    await navigator.clipboard.writeText(url);
  }
</script>

<div
  class="share"
  class:inverted
>
  <div class="label">
    <slot />
  </div>
  <div class="buttons">
    <a
      class="twitter"
      href="https://twitter.com/intent/tweet?url={$filterUrl}"
      target="_blank"
      title="Share via Twitter"
    >
      <Icon data={twitter} />
    </a>
    <a
      class="copy"
      href="javascript:void(0)"
      on:click={() => copyToClipBoard($filterUrl)}
      title="Copy to clipboard"
    >
      <Icon data={copy} />
    </a>
  </div>
</div>

<style>
  .share {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--primFont);
    user-select: none;
    --inputHeight: 40px;
  }

  .label {
    color: var(--darkgray);
    font-size: 1rem;
  }

  .buttons {
    display: flex;
  }

  a {
    padding: 10px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  :global(.share a .fa-icon) {
    width: 25px;
    height: 25px;
    fill: var(--darkgray);
  }

  :global(.share a:hover .fa-icon) {
    fill: var(--primBlue);
  }

  :global(.share.inverted a .fa-icon) {
    width: 25px;
    height: 25px;
    fill: var(--background);
  }

  :global(.share.inverted a:hover .fa-icon) {
    fill: var(--darkgray);
  }
</style>