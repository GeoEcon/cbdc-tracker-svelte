<script>

import Card from './Card.svelte';
import { spotlightdata } from '../../stores/spotlightdata';
import { newConstant } from '../../stores/test';

import { onMount } from 'svelte';

let vals = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];

console.log("new constant", newConstant)

onMount(() => {
});

</script>

<div class="spotlight-section">
  <h1>Spotlight</h1>
  {#each $spotlightdata as d}
    <Card titleCard="{d.overview_spotlight}" country="{d.name}" />
  {/each}    
</div>

<style>
  h1 {
    color: #000;
    font-family: var(--primFont);
		/* should be responsive */
    font-size: 1.875rem;
    font-weight: 700;
		text-align: center;
  }

	.spotlight-section {
		padding: 10px;
	}
</style>