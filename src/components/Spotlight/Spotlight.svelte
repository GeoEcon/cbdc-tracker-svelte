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
    padding-top: 20px;
    border-top: 1px dashed var(--gray);
  }
	.spotlight-section {
		padding: 10px;
	}
  .spotlight-container {
    display: inline-flex;
    justify-content: center;
    padding-top: 30px;
    width:100%;
    gap: 30px;
  }
</style>