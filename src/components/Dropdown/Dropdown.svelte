<script>
  import { clickOutside } from '../../actions/clickoutside';
  import { hasOverlap } from "../../utils/logic";

  import Chip from './Chip.svelte';

  export let filter;
  export let label = '';

  let searchValue = '';
  let hoveredSuggestionId = null;
  let showSuggestions = false;
  let chips = [];

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      searchValue = '';
      showSuggestions = false;
    }
  }

  function handleSuggestionSelect(id) {
    filter.click(id);
    chips = [...chips, $filter.find(d => d.id === id)];
    showSuggestions = false;
  }

  $: id = `dropdown_${label.toLowerCase()}`;

  $: suggestions = $filter.filter(d => {
    if (!searchValue) return true;
    const regexp = new RegExp(searchValue, 'gi');
    return regexp.test(d.name);
  });

  $: console.log($filter)
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="dropdown">
  <label for={id}>{label}</label>
  <div class="field">
    <ul class="chips">
      {#each chips as { id, name} (id)}
        <li>
          <Chip
            id={id}
            name={name}
          />
        </li>
      {/each}
    </ul>
    <input
      id={id}
      type="text"
      placeholder="Type..."
      autocomplete="no"
      spellcheck="no"
      bind:value={searchValue}
      on:focus={() => showSuggestions = true}
      use:clickOutside={() => showSuggestions = false}
    />
  </div>
  {#if (showSuggestions)}
    <ul class="suggestions">
      {#each suggestions as { id, name } (id)}
        <li
          class:active={hoveredSuggestionId && hoveredSuggestionId === id}
          class:selected={hasOverlap([id], $filter)}
          on:mouseenter={() => hoveredSuggestionId = id}
          on:mouseleave={() => hoveredSuggestionId = null}
          on:click={() => handleSuggestionSelect(id)}
        >{name}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    width: 100%;
    font-family: var(--primFont);
    user-select: none;
  }

  .field {
    position: relative;
  }

  ul.chips {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
  }

  ul.chips li {
    margin: 0.2rem;
  }

  input {
    font-size: 1.1rem;
    border: none;
    outline: none;
  }

  .suggestions {
    position: absolute;
    z-index: 1000;
  }

  .suggestions li {
    cursor: pointer;
  }

  .suggestions li.active {
    background-color: gray;
    transition: all 0.2s;
  }

  .suggestions li.selected {
    font-weight: bold;
    transition: all 0.2s;
  }
</style>