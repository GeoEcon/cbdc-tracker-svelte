<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, draw } from 'svelte/transition';

  import { tagConnectorPath, tagLabelPath } from '../../utils/paths';

  import Centroid from './Centroid.svelte';

  export let data;
  export let tagHeight = 35;
  export let tagGap = 10;
  export let tagOffset = 40;

  const labelArrowWidth = 30;
  const pathGrowDuration = 200;
  const cornerRadius = 5;

  const dispatch = createEventDispatcher();

  let textCategoryElems = [];
  let textNameElems = [];

  function handleTagLabelClick(tag) {
    const { category, name } = tag;
    dispatch('tagclick', {
      category,
      name
    });
  }

  $: tags = [
    {
      category: 'name',
      ...data.name
    },
    ...Object.keys(data.categories)
    .map(key => {
      return {
        category: key,
        ...data.categories[key]
      };
    })
    .filter(d => d.name !== 'not available')
  ];

  $: totalHeight = Math.max(0, tagHeight * (tags.length - 1) + tagGap * (tags.length - 2));

  $: tagDirection = 1; //data.centroid[0] < mapWidth / 2 ? 1 : -1;

  $: tagsPaths = tags.map((tag, i) => {
    const direction = (tag.category === 'name' ? -1 : 1) * tagDirection;
    const height = tag.category === 'name' ? tagHeight : totalHeight;
    const x2 = direction * tagOffset;
    const y2 = i * (tagHeight + tagGap) - height / 2 + tagHeight / 2;
    const x3 = x2 + labelArrowWidth * direction;
    const y3 = y2 - tagHeight / 2;
    const x4 = x3 + 0.5 * labelArrowWidth * direction;
    const y4 = y3;
    const x5 = x4;
    const y5 = y4 + tagHeight;
    const x6 = x3;
    const y6 = y5;
    return {
      ...tag,
      id: i,
      x1: 0,
      y1: 0,
      x2,
      y2,
      x3,
      y3,
      x4,
      y4,
      x5,
      y5,
      x6,
      y6,
      direction
    };
  });

  $: tagsPathsRefined = textNameElems.map((textName, i) => {
    const tag = tagsPaths[i];
    const { direction } = tag;
    const { width: widthCategory } = textCategoryElems[i].getBBox();
    const { width: widthName, height } = textName.getBBox();
    const width = Math.max(widthCategory, widthName);
    return {
      ...tag,
      x4: tag.x4 + width * direction,
      x5: tag.x4 + width * direction,
      textCategoryYOffset: -tagHeight / 6,
      textNameYOffset: tag.category === 'name' ? height / 4 : tagHeight / 3
    };
  });
</script>

<g class="shadow-hover-tag">
  {#each tagsPaths as tag, i (tag.id)}
    <text
      class="tag-text-category"
      bind:this={textCategoryElems[i]}
    >
      {tag.title}
    </text>
    <text
      class="tag-text-name"
      bind:this={textNameElems[i]}
    >
      {tag.name}
    </text>
  {/each}
</g>
<g
  class="hover-tag"
  transform="translate({data.centroid[0]} {data.centroid[1]})"
  on:mouseenter
  on:mouseleave
>
  {#each tagsPathsRefined as tag (tag.id)}
    <path
      class="tag-connector-path background"
      d={tagConnectorPath(tag.x1, tag.y1, tag.x2, tag.y2)}
      transition:draw={{duration: pathGrowDuration}}
    />
    <path
      class="tag-connector-path"
      d={tagConnectorPath(tag.x1, tag.y1, tag.x2, tag.y2)}
      stroke={data.categories.new_status.color}
      transition:draw={{duration: pathGrowDuration}}
    />
    <g
      class="tag-label"
      in:fade={{delay: pathGrowDuration}}
      out:fade={{delay: 0}}
      style="--stroke: {data.categories.new_status.color};"
    >
      <path
        class="tag-label-path background"
        class:country={tag.category === 'country'}
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tag.direction * cornerRadius)}
      />
      <path
        class="tag-label-path"
        class:country={tag.category === 'name'}
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tag.direction * cornerRadius)}
        fill={tag.category === 'name' ? data.categories.new_status.color : 'var(--secWhite)'}
        on:click={() => handleTagLabelClick(tag)}
      />
      <g
        class="tag-label-content"
        transform="translate({tag.x2} {tag.y2})"
      >
        {#if (tag.category !== 'name')}
          <text
            class="tag-text-category"
            text-anchor="{tag.direction === 1 ? 'start' : 'end'}"
            dx={labelArrowWidth * tag.direction}
            dy={tag.textCategoryYOffset}
            fill={tag.category === 'name' ? 'var(--darkgray)' : data.categories.new_status.color}
          >
            {tag.title}
          </text>
        {/if}
        <text
          class="tag-text-name"
          text-anchor="{tag.direction === 1 ? 'start' : 'end'}"
          dx={labelArrowWidth * tag.direction}
          dy={tag.textNameYOffset}
        >
          {tag.name}
        </text>
      </g>
    </g>
  {/each}
</g>
<Centroid
  dataCountry={data}
  color={data.categories.new_status.color}
  isReactive={false}
  inverted={data.status === 'region'}
/>

<style>
  g {
    user-select: none;
    pointer-events: none;
  }

  g.tag-label {
    pointer-events: all;
  }

  .background {
    fill: none;
  }

  g.shadow-hover-tag {
    visibility: hidden;
  }

  .tag-connector-path {
    stroke-width: 2;
    fill: none;
  }

  .tag-connector-path.background {
    stroke: var(--background);
    stroke-width: 4;
    fill: none;
  }

  .tag-label-path {
    stroke: var(--stroke);
    stroke-width: 2;
  }

  .tag-label-path:not(.country) {
    cursor: pointer;
  }

  .tag-label-path:not(.country):hover {
    stroke: var(--darkgray);
  }

  .tag-label-path.background {
    stroke: var(--background);
    stroke-width: 4;
  }

  text {
    font-family: var(--primFont);
  }

  .tag-text-category {
    font-size: 0.8rem;
  }

  .tag-text-name {
    fill: var(--darkgray);
    font-size: 1rem;
  }
</style>