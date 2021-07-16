<script>
  import { questionMark } from '../../utils/icons';
  
  import Icon from 'svelte-awesome';

  export let label = "Share this view";
</script>

<div class="share">
  <div class="label">
    <span class="title"
    >
      {label}
    </span>
  </div>
  <div class="field"></div>
  <div class="share-footer"></div>
</div>

<style>
  .share {
    position: relative;
    width: 100%;
    font-family: var(--primFont);
    user-select: none;
    --inputHeight: 40px;
  }

  .label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: var(--darkgray);
    font-size: 1rem;
  }

  .field {
    position: relative;
    width: 100%;
    min-height: var(--inputHeight);
    height: auto;
    background-color: var(--secWhite);
  }
  
  .share-footer {
    width: 100%;
    height: calc(0.2 * var(--inputHeight));
    background-color: var(--gray);
  }
</style>