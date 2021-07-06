<script>
  import { isVertical } from '../stores/device';
</script>

{#if (!$isVertical)}
  <div class="logo">
    <img src="./img/logo.png" alt="Logo of the Atlantic Council GeoEconomics Center" />
  </div>
{/if}

<style>
  .logo {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    width: 200px;
    margin: 2rem 1rem;
  }

  img {
    width: 100%;
  }
</style>