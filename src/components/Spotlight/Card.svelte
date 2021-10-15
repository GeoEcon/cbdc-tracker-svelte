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

<div class="spotlight-card">
  <div>
    <span class="card-country">{datum.name}</span> 
    <span class="card-project">{datum.currency_name}</span> 
  </div>
  <hr>

  <div>
    <p>{datum.overview_spotlight}</p>
  </div>

  <div class="card-key-developments">
    <p>
      {datum.key_developments_spotlight}
    </p>
  </div>

  <div>
    {#each categories as cat (cat.title)}
      <div class="card-global-tag" use:css={{chipColor: cat.color}}>
        <div
          class="card-local-tag"
          use:css={{chipColor: cat.color}}
        >
          <span class="card-cat-title">{cat.title}</span>
          <span class="chip">{cat.name}</span>
        </div> 
      </div>
    {/each}
  </div>
</div>

<style>
  .spotlight-card {
    max-width: 600px;
    margin: 25px auto;
    padding: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.16);
  }

  .chip {
    padding: 0.2rem 0.4rem;
    color: var(--secWhite);
    font-size: 1.2rem;
    background-color: var(--chipColor);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .card-project {
    font-size: 1rem;
  }

  .card-country {
    font-size: 2rem;
  }

  .card-key-developments {
    background-color: #ccc;
  }

  .card-global-tag {
    border: 1px solid var(--chipColor);
    display: inline-flex;
    margin: 3px;
  }

  .card-local-tag {
    display: inline-flex;
  }

  .card-cat-title {
    padding: 0.2rem 0.4rem;
  }

</style>