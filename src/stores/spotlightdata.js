import { derived } from 'svelte/store';
import { data } from './data';

export const spotlightdata = derived(
  [
    data
  ],
  ([
    $data,
  ]) => {
    return $data.filter(
      (d) => d.overview_spotlight !== '' && d.key_developments_spotlight !== ''
    ).map((d) => {
      return {
        ...d,
				...d.name,
        ...d.currency_name,
				...d.overview_spotlight,
        ...d.key_developments_spotlight
      };
    });
  }, []);