<script>
  import { clickOutside } from '../../actions/clickoutside';
  import { setFocus } from '../../actions/focus';
  import { areAllSelected, hasOverlap } from "../../utils/logic";

  import Chip from './Chip.svelte';
  import BarChart from './BarChart.svelte';
  import Suggestion from './Suggestion.svelte';

  export let filter;
  export let label = '';
  export let fullRollup = [];
  export let rollup = [];

  let searchValue = '';
  let hoveredSuggestion = null;
  let showSuggestions = false;
  let chips = [];

  function handleResetClick() {
    filter.selectAll();
  }

  function handleShowSuggestions() {
    hoveredSuggestion = 0;
    showSuggestions = true;
  }

  function handleFieldClickOutside() {
    showSuggestions = false;
    searchValue = '';
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      searchValue = '';
      showSuggestions = false;
    }
    
    if (showSuggestions) {
      if (hoveredSuggestion !== null) {
        if (e.keyCode === 13) { // enter
          handleSuggestionSelect(suggestions[hoveredSuggestion].id);
        }
      }
    
      if (e.keyCode === 38) { // arrow up
        hoveredSuggestion = Math.max(hoveredSuggestion - 1, 0);
      } else if (e.keyCode === 40) { // arrow down
        hoveredSuggestion = Math.min(hoveredSuggestion + 1, suggestions.length - 1);
      }
    }
  }

  function handleSuggestionSelect(id) {
    filter.click(id);
    showSuggestions = false;
  }

  $: id = `dropdown_${label.toLowerCase()}`;

  $: {
    let prelimChips = $filter.filter(d => d.selected);
    if (prelimChips.length === $filter.length) {
      prelimChips = [];
    }
    chips = prelimChips;
  }

  $: suggestions = $filter.filter(d => {
    if (!searchValue) return true;
    const regexp = new RegExp(searchValue, 'gi');
    return regexp.test(d.name);
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="dropdown">
  <label
    class:active={showSuggestions}
    for={id}
  >
    <span>{label}</span>
    {#if (chips.length)}
      <button
        on:click={handleResetClick}
      >
        <span>Reset</span>
        <span class="reset">+</span>
      </button>
    {/if}
  </label>
  <div
    class="field"
    on:click={() => showSuggestions = true}
    use:clickOutside={handleFieldClickOutside}
  >
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
  </div>
  <BarChart
    rollup={rollup}
    fullRollup={fullRollup}
  />
  {#if (showSuggestions)}
    <div class="suggestions">
      <input
        id={id}
        type="text"
        placeholder="Search..."
        autocomplete="no"
        spellcheck="no"
        bind:value={searchValue}
        on:focus={handleShowSuggestions}
        use:setFocus
      />
      <ul class="suggestions">
        {#each suggestions as { id, name }, i (id)}
          <Suggestion
            name={name}
            fullRollup={fullRollup.find(d => d.name === name)}
            rollup={rollup.find(d => d.name === name)}
            isActive={hoveredSuggestion === i}
            isSelected={!areAllSelected($filter) && hasOverlap([id], $filter)}
            showColorBox={label !== 'Country'}
            on:mouseenter={() => hoveredSuggestion = i}
            on:mouseleave={() => hoveredSuggestion = null}
            on:click={() => handleSuggestionSelect(id)}
          />
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    width: 100%;
    font-family: var(--primFont);
    user-select: none;
    --inputHeight: 40px;
  }

  label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: var(--darkgray);
    font-size: 1rem;
  }

  label.active {
    color: var(--primBlack);
  }

  label button {
    display: flex;
    align-items: center;
    color: var(--darkgray);
    font-size: 0.9rem;
    line-height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  label button:hover {
    color: var(--primBlack);
  }

  label button span.reset{
    display: inline-block;
    margin: 0 0.2rem;
    font-size: 1.3rem;
    line-height: 100%;
    transform: rotate(45deg);
  }

  label button:hover span.reset{
    font-weight: bold;
  }

  .field {
    position: relative;
    width: 100%;
    min-height: var(--inputHeight);
    height: auto;
    background-color: var(--secWhite);
    cursor: pointer;
  }

  .field:hover {
    background-color: var(--gray);
  }

  ul.chips {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    padding: 0.2rem;
    min-height: var(--inputHeight);
    list-style-type: none;
  }

  ul.chips li {
    height: calc(0.65 * var(--inputHeight));
    margin: 0.2rem;
  }

  .suggestions {
    position: absolute;
    z-index: 1000;
    width: 100%;
    background-color: var(--secWhite);
  }

  input {
    width: 100%;
    height: var(--inputHeight);
    padding: 0 0.5rem;
    font-size: 1.1rem;
    background-color: var(--secWhite);
    border: none;
    outline: none;
  }

  .suggestions ul {
    max-height: 400px;
    list-style-type: none;
    overflow-y: scroll;
  }
</style>