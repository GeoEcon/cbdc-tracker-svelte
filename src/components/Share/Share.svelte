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
      href="https://twitter.com/intent/tweet?url={encodeURIComponent($filterUrl)}"
      target="_blank"
      title="Share this view via Twitter"
    >
      <Icon data={twitter} />
    </a>
    <a
      class="copy"
      href="javascript:void(0)"
      on:click={() => copyToClipBoard($filterUrl)}
      title="Copy this view to clipboard"
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
    --iconWidth: 20px;
  }

  .label {
    display: none;
    color: var(--darkgray);
    font-size: 0.9rem;
  }

  /* @media (min-width: 600px) {
    .label {
      display: block;
    }
  } */

  .buttons {
    display: flex;
  }

  a {
    padding: 7px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  :global(.share a .fa-icon) {
    width: var(--iconWidth);
    height: var(--iconWidth);
    fill: var(--darkgray);
  }

  :global(.share a:hover .fa-icon) {
    fill: var(--primBlue);
  }

  :global(.share.inverted a .fa-icon) {
    width: var(--iconWidth);
    height: var(--iconWidth);
    fill: var(--background);
  }

  :global(.share.inverted a:hover .fa-icon) {
    fill: var(--darkgray);
  }
</style>