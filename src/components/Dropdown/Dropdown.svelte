<script>
  import { clickOutside } from '../../actions/clickoutside';
  import { hasOverlap } from "../../utils/logic";

  import Chip from './Chip.svelte';

  export let filter;
  export let label = '';

  let searchValue = '';
  let hoveredSuggestion = null;
  let showSuggestions = false;
  let chips = [];

  function handleShowSuggestions() {
    hoveredSuggestion = 0;
    showSuggestions = true;
  }

  function handleCloseSuggestions() {
    showSuggestions = false;
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      searchValue = '';
      showSuggestions = false;
    }

    if (hoveredSuggestion !== null) {
      if (e.keyCode === 13) { // enter
        handleSuggestionSelect(suggestions[hoveredSuggestion].id);
      }
    }
    
    if (showSuggestions) {
      if (e.keyCode === 38) { // arrow up
        hoveredSuggestion = Math.max(hoveredSuggestion - 1, 0);
      } else if (e.keyCode === 40) { // arrow down
        hoveredSuggestion = Math.min(hoveredSuggestion + 1, suggestions.length - 1);
      }
    } else {
      if (e.keyCode === 40) { // arrow down
        hoveredSuggestion = 0;
        showSuggestions = true;
      }
    }
  }

  function handleSuggestionSelect(id) {
    filter.click(id);
    const index = chips.map(d => d.id).indexOf(id);
    if (index > -1) {
      chips = chips.filter(d => d.id !== id);
    } else {
      chips = [...chips, $filter.find(d => d.id === id)];
    }
    showSuggestions = false;
  }

  $: id = `dropdown_${label.toLowerCase()}`;

  $: suggestions = $filter.filter(d => {
    if (!searchValue) return true;
    const regexp = new RegExp(searchValue, 'gi');
    return regexp.test(d.name);
  });
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
            on:close={() => handleSuggestionSelect(id)}
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
      on:focus={handleShowSuggestions}
      use:clickOutside={handleCloseSuggestions}
    />
  </div>
  {#if (showSuggestions)}
    <ul class="suggestions">
      {#each suggestions as { id, name }, i (id)}
        <li
          class:active={hoveredSuggestion === i}
          class:selected={hasOverlap([id], $filter)}
          on:mouseenter={() => hoveredSuggestion = i}
          on:mouseleave={() => hoveredSuggestion = null}
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

  ul.suggestions {
    position: absolute;
    z-index: 1000;
    list-style-type: none;
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