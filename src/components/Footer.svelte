<script>
  import Share from './Share/Share.svelte';
</script>

<footer>
  <Share>Share this view</Share>
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem;
  }

  @media (min-width: 600px) {
    footer {
      justify-content: flex-end;
    }
  }
</style>