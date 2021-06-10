import { writable, derived } from 'svelte/store';

import { isMobile } from './device';

export const rawData = writable([]);

export const data = derived([rawData, isMobile], ([$rawData, $isMobile]) => {
  
});