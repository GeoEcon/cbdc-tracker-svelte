<script>
  export let filter;
  export let label = '';

  $: id = `dropdown_${label.toLowerCase()}`;
</script>

<div class="dropdown">
  <label for={id}>{label}</label>
  <div class="field">
    <ul class="chips"></ul>
    <input
      id={id}
      type="text"
      placeholder="Type..."
      autocomplete="no"
    />
  </div>
  <ul class="suggestions"></ul>
</div>

<style>
  .dropdown {
    font-family: var(--primFont);
  }

  .field {

  }

  input {
    font-size: 1.1rem;
    border: none;
    outline: none;
  }
</style>