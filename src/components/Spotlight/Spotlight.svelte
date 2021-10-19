<script>
import Card from './Card.svelte';

import { spotlightdata } from '../../stores/spotlightdata';
import { onMount } from 'svelte';

onMount(() => {
});
</script>

<div class="spotlight-section">
  <h1>Spotlight</h1>
  <div class="spotlight-container">
    {#each $spotlightdata as d}
    <Card datum={d} />
    {/each}  
  </div>   
</div>

<style>
  h1 {
    color: #000;
    font-family: var(--primFont);
		/* should be responsive */
    font-size: 1.875rem;
    font-weight: 700;
		text-align: center;
    padding: 20px 0px 10px 0px;
    border-top: 1px dashed var(--gray);
  }
	.spotlight-section {
		padding: 10px;
	}

  .spotlight-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width:100%;
  }

  @media (min-width: 1100px) {
    .spotlight-container {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: initial;
      padding: 30px 5px;
    }
  }

</style>