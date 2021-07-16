<script>
  import { isVertical } from '../../stores/device';
</script>

{#if (!$isVertical)}
  <div class="logo">
    <img src="./img/logo-smaller.png" alt="Logo of the Atlantic Council GeoEconomics Center" />
  </div>
{/if}

<style>
  .logo {
    width: 270px;
  }

  img {
    width: 100%;
  }
</style>