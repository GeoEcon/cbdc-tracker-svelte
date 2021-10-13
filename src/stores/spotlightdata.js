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
      (d) => d.overview_spotlight !== ''
    ).map((d) => {
      return {
        ...d,
				...d.name,
				...d.overview_spotlight
      };
    });
  }, []);