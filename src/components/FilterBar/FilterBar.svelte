<script>
  import { statusFilter } from '../../stores/filter';

  import Dropdown from '../Dropdown/Dropdown.svelte';
</script>

<div class="filter-bar">
  <Dropdown
    filter={statusFilter}
    label="Status"
  />
</div>

<style>
  .filter-bar {
    display: grid;
  }
</style>