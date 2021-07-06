<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import { isVertical } from '../../stores/device';
  import { css } from '../../actions/css';
import { extractHostname } from '../../utils/misc';

  export let datum;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      close();
    }
  }

  function handleCategoryClick(category, name) {
    dispatch('categoryclick', { category, name });
    close();
  }

  $: categories = Object.keys(datum.categories).map(key => {
    return {
      category: key,
      ...datum.categories[key]
    };
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="modal"
  use:css={{statusColor: datum.categories.new_status.color}}
  transition:fade={{duration: 200}}
>
  <div
    class="modal-outer"
    on:click={close}
  >
  </div>
  <div class="modal-inner">
    {#if ($isVertical)}
      <button
        class="close-button overlay"
        on:click={close}
      >
        <span>+</span>
      </button>
    {/if}
    <div
      class="header"
    >
      <div class="header-top-line">
        <button
          class="close-button"
          on:click={close}
        >
          <span>+</span>
        </button>
      </div>
      <div class="header-content">
        <h1>{datum.name.name}</h1>
        <p>{datum.overview}</p>
      </div>
    </div>
    <div class="body">
      <div class="categories">
        {#each categories as cat (cat.title)}
          <div
            class="category"
            style="--chipColor: {cat.color};"
          >
            <h3>{cat.title}</h3>
            <button
              class="chip"
              on:click={() => handleCategoryClick(cat.category, cat.name)}
            >
              {cat.name}
            </button>
          </div>
        {/each}
      </div>
      <main>
        <h2>Key developments</h2>
        <p>{datum.key_developments}</p>
        <h4>Sources</h4>
        <ul class="sources">
          {#each datum.sources as url}
            <li><a href={url} target="_blank">{extractHostname(url)}</a></li>
          {/each}
        </ul>
      </main>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-family: var(--primFont);
  }

  .modal-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.7;
  }

  .modal-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
    background-color: var(--background);
    overflow-y: scroll;
  }

  @media (min-width: 980px) {
    .modal-inner {
      width: 90%;
      max-width: 1600px;
      height: 90%;
    }
  }

  .header {
    width: 100%;
    padding: 1.5rem 0 3rem 0;
    background-color: var(--statusColor);
  }

  .header-top-line {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0 1.5rem;
  }

  .close-button {
    width: 50px;
    height: 50px;
    color: var(--background);
    background-color: var(--statusColor);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .close-button.overlay {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 20000;
  }

  .close-button:hover {
    color: var(--primBlack);
  }

  .close-button span {
    display: inline-block;
    font-size: 3rem;
    font-weight: bold;
    line-height: 1;
    transform: rotate(45deg);
  }

  .header-content {
    width: 100%;
    padding: 0 3rem;
  }

  .header-content h1 {
    margin: 1rem 0;
    font-size: 3rem;
    color: var(--background);
  }

  p {
    color: var(--darkgray);
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .header-content p {
    width: 100%;
    max-width: 1100px;
    color: var(--background);
  }

  @media (min-width: 980px) {
    .header-content p {
      width: 60%;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 980px) {
    .body {
      flex-direction: row;
    }
  }

  .categories {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 1.5rem;
  }

  @media (min-width: 600px) {
    .categories {
      flex-direction: row;
    }
  }

  @media (min-width: 980px) {
    .categories {
      flex-direction: column;
      order: 2;
    }
  }

  .category {
    margin: 1.5rem;
  }

  .category h3 {
    color: var(--darkgray);
    font-size: 1.5rem;
    font-weight: normal;
    white-space: nowrap;
  }

  .chip {
    margin: 0.3rem 0;
    padding: 0.2rem 0.4rem;
    color: var(--secWhite);
    font-size: 1.2rem;
    background-color: var(--chipColor);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .chip:hover {
    color: var(--darkgray);
  }

  main {
    width: 100%;
    max-width: 1100px;
    padding: 2rem 3rem;
  }

  @media (min-width: 980px) {
    main {
      order: 1;
      width: 60%;
    }
  }

  main h2 {
    margin: 0.8rem 0;
    color: var(--darkgray);
    font-size: 1.7rem;
  }

  main h4 {
    margin: 2rem 0 0.8rem 0;
    color: var(--darkgray);
    font-size: 1.2rem;
  }

  ul.sources {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }

  @media (min-width: 980px) {
    ul.sources {
      flex-direction: row;
    }
  } 

  ul.sources li {
    margin: 0.2rem 0.8rem 0.2rem 0;
  }

  ul.sources li a {
    font-size: 1.1rem;
  }
</style>