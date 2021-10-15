<script>
  import { orderBy } from 'lodash-es';
  import { css } from '../../actions/css';

  export let datum;

  $: categories = orderBy(Object.keys(datum.categories).map(key => {
    return {
      category: key,
      ...datum.categories[key]
    };
  }),
  'filterable', 'desc');
</script>

<div>
  <h1>{datum.name}</h1>
  <h3>Project Name - {datum.currency_name}</h3>
  <p>{datum.overview_spotlight}</p>
  <h3>Key developments</h3><br>
  <p>
    {datum.key_developments_spotlight}
  </p>
  <br>---<br>

  <div>
    {#each categories as cat (cat.title)}
      <div
        use:css={{chipColor: cat.color}}
      >
        <h3>{cat.title}</h3>
        <span class="chip">{cat.name}</span>
      </div>
    {/each}
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
    margin: 0;
    padding: 0;
    background-color:#000000;
    opacity: 0.7;
  }

  .modal-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 150px;
    background-color: var(--background);
    border: 1px solid var(--statusColor);
    overflow-y: auto;
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
    padding: 0 1.5rem 0 2rem;
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
    bottom: 150px;
    z-index: 20000;
  }

  .close-button:hover {
    color: var(--darkgray);
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

  .header-content h2 {
    margin: 0.5rem 0 1rem 0;
    font-size: 1.5rem;
    color: var(--background);
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

  .categories-wrapper {
    padding: 2rem 3rem;
  }

  .categories {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media (min-width: 600px) {
    .categories {
      flex-direction: row;
    }
  }

  @media (min-width: 980px) {
    .categories-wrapper {
      order: 2;
    }

    .categories {
      flex-direction: column;
    }
  }

  .category {
    margin: 1.5rem 1.5rem 1.5rem 0;
  }

  .category h3 {
    color: var(--darkgray);
    font-size: 1.5rem;
    font-weight: normal;
    white-space: nowrap;
  }

  .category span {
    display: inline-block;
    margin: 0.5rem 0;
    color: var(--darkgray);
    font-size: 1.2rem;
    opacity: 0.8;
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

  main h2, .categories-wrapper h2 {
    margin: 0.8rem 0;
    color: var(--darkgray);
    font-size: 1.7rem;
  }

  .small {
    display: inline-block;
    margin: 0 0.4rem;
    font-size: 1rem;
  }

  main h4 {
    margin: 2rem 0 0.8rem 0;
    color: var(--darkgray);
    font-size: 1.2rem;
  }

  .sources ul.media-sources {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style-type: none;
  }

  @media (min-width: 980px) {
    .sources ul.media-sources {
      flex-direction: row;
    }
  } 

  .sources ul.media-sources li {
    margin: 0 0.8rem 0.2rem 0;
  }

  .sources a {
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .sources p {
    margin: 0.4rem 0 0.35rem 0;
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .share-panel {
    margin: 0.5rem 0 1rem 0;
  }
</style>