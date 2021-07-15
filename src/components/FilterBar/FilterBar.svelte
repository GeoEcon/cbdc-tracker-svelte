<script>
  import { slide } from 'svelte/transition';

  import {
    statusFilter,
    useCaseFilter,
    architectureFilter,
    infrastructureFilter,
    accessFilter } from '../../stores/filter';
  import {
    fullStatusRollup,
    fullUseCaseRollup,
    fullArchitectureRollup,
    fullInfrastructureRollup,
    fullAccessRollup,
    statusRollup,
    useCaseRollup,
    architectureRollup,
    infrastructureRollup,
    accessRollup } from '../../stores/aggregation';
  import { isVertical } from '../../stores/device';
  import { definitions, tooltip } from '../../stores/definitions';
  import { css } from '../../actions/css';

  import FilterTitle from './FilterTitle.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: extraFiltersExpanded = !$isVertical;

  $: dropdownsTop = [
    {
      filter: statusFilter,
      label: 'Status',
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup,
      info: $definitions.status
    }
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottom = [
    {
      filter: useCaseFilter,
      label: 'Use case',
      fullRollup: $fullUseCaseRollup,
      rollup: $useCaseRollup,
      info: $definitions.use_case
    },
    // {
    //   filter: technologyFilter,
    //   label: 'Technology',
    //   fullRollup: $fullTechnologyRollup,
    //   rollup: $technologyRollup,
    //   info: true
    // },
    {
      filter: architectureFilter,
      label: 'Architecture',
      fullRollup: $fullArchitectureRollup,
      rollup: $architectureRollup,
      info: $definitions.architecture
    },
    {
      filter: infrastructureFilter,
      label: 'Infrastructure',
      fullRollup: $fullInfrastructureRollup,
      rollup: $infrastructureRollup,
      info: $definitions.infrastructure
    },
    {
      filter: accessFilter,
      label: 'Access',
      fullRollup: $fullAccessRollup,
      rollup: $accessRollup,
      info: $definitions.access
    }
  ].map((d, i) => ({...d, id: i}));

  $: maxColumns = Math.max(dropdownsTop.length, dropdownsBottom.length);
</script>

<div
  class="filter-bar"
  use:css={{maxColumns, halfMaxColumns: Math.ceil(maxColumns / 2)}}
>
  <FilterTitle
    label="Filters"
  />
  <div class="standard grid-container">
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup, info }, i (id)}
      <Dropdown
        filter={filter}
        label={label}
        fullRollup={fullRollup}
        rollup={rollup}
        info={info}
        tooltip={tooltip}
        showReset
        showClickHint={i === 0 ? `${$isVertical ? 'Tap' : 'Click'} to filter` : null}
      />
    {/each}
  </div>
  <FilterTitle
    label="Extra filters"
    expandable
    bind:expanded={extraFiltersExpanded}
  />
  {#if (extraFiltersExpanded)}
    <div
      class="extra grid-container"
      transition:slide
    >
      {#each dropdownsBottom as { id, filter, label, fullRollup, rollup, info }, i (id)}
        <Dropdown
          filter={filter}
          label={label}
          fullRollup={fullRollup}
          rollup={rollup}
          info={info}
          tooltip={tooltip}
          showReset
          showClickHint={i === 0 ? `${$isVertical ? 'Tap' : 'Click'} to filter` : null}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .filter-bar {
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px dashed var(--gray);
  }

  .grid-container {
    display: grid;
    width: 100%;
    padding: 1rem;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0.3rem;
    row-gap: 0.3rem;
    align-items: stretch;
    justify-items: stretch;
    justify-content: end;
  }

  @media (min-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(var(--halfMaxColumns), 1fr);
    }
  }

  @media (min-width: 980px) {
    .grid-container {
      grid-template-columns: repeat(var(--maxColumns), 1fr);
    }
  }
</style>