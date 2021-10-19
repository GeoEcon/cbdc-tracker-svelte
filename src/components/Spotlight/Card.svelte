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
  <div class="card-header">
    <div class="card-country-currency">
      <div class="card-country">{datum.name}</div>
      <div class="card-project">{datum.currency_name}</div> 
    </div>
    <div class="card-overview">
      <p>{datum.overview_spotlight}</p>
    </div>
  </div>
  

  <div class="card-key-developments">
    <p>
      {datum.key_developments_spotlight}
    </p>
  </div>

  <div class="card-tag-list">
    {#each categories as cat (cat.title)}
      <div 
        class="card-global-tag" 
        use:css={{chipColor: cat.color}}
      >
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
    font-family: var(--primFont);
    max-width: 600px;
    box-shadow: 0 1px 2px rgba(0,0,0,.16);
    border: 1px solid #005596;
    margin: 5px;
  }

  .chip {
    padding: 0.2rem 0.4rem;
    color: #fff;
    background-color: var(--chipColor);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .card-header {
    background-color: #005596;
    padding: 10px;
    border-bottom: 1px solid #bbb;
    padding: 10px;
    display: block;
    width: 100%;
    color: #fff;
  }

  .card-overview {
    font-size: 0.8rem;
    max-width: 300px;
    text-align: left;
    font-style: italic;
  }

  .card-project {
    color: #fff;
    font-family: var(--primFont);
    font-size: 1.5rem;
    font-weight: 300;
    text-align: left;
  }

  .card-country {
    color: #89b8db;
    font-family: var(--primFont);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .card-key-developments {
    margin: 20px;
    font-size: 0.8rem;
    color: #4a4a4a;
  }

  .card-tag-list {
    font-size: 0.8rem;
    padding: 10px;
  }
  .card-global-tag {
    border: 2px solid var(--chipColor);
    border-radius: 3px;
    display: inline-flex;
    margin: 3px;
  }

  .card-local-tag {
    display: inline-flex;
    font-size: 0.7rem;
  }

  .card-cat-title {
    padding: 0.2rem 0.4rem;
  }

  @media (min-width: 600px) {
    .spotlight-card {
      margin: 15px;
    }
    .card-header {
      display: inline-flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .card-project {
      text-align: center;
    }
    .card-overview {
      text-align: left;
    }
    .card-local-tag {
      font-size: 0.9rem;
    }
  }

</style>