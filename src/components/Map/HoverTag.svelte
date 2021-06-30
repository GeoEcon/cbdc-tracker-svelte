<script>
  import { fade, draw } from 'svelte/transition';

  import { tagConnectorPath, tagLabelPath } from '../../utils/paths';

  import Centroid from './Centroid.svelte';

  export let data;
  export let tagHeight = 35;
  export let tagGap = 10;
  export let tagOffset = 50;
  export let mapWidth = 0;

  const labelArrowWidth = 30;
  const pathGrowDuration = 200;
  const cornerRadius = 5;

  let textCategoryElems = [];
  let textNameElems = [];

  $: tags = [
    data.name,
    ...Object.keys(data.categories)
    .map(key => {
      return {
        category: key,
        ...data.categories[key]
      };
    })
    .filter(d => d.name !== 'n/a')
  ];

  $: totalHeight = Math.max(0, tagHeight * tags.length + tagGap * (tags.length - 1));

  $: tagDirection = data.centroid[0] < mapWidth / 2 ? 1 : -1;

  $: tagsPaths = tags.map((tag, i) => {
    const x2 = tagDirection * tagOffset;
    const y2 = i * (tagHeight + tagGap) - totalHeight / 2 + tagHeight / 2;
    const x3 = x2 + labelArrowWidth * tagDirection;
    const y3 = y2 - tagHeight / 2;
    const x4 = x3 + 0.5 * labelArrowWidth * tagDirection;
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
      y6
    };
  });

  $: tagsPathsRefined = textNameElems.map((textName, i) => {
    const tag = tagsPaths[i];
    const { width: widthCategory } = textCategoryElems[i].getBBox();
    const { width: widthName } = textName.getBBox();
    const width = Math.max(widthCategory, widthName);
    return {
      ...tag,
      x4: tag.x4 + width * tagDirection,
      x5: tag.x4 + width * tagDirection,
      textCategoryYOffset: -tagHeight / 6,
      textNameYOffset: tagHeight / 3
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
      in:fade={{delay: pathGrowDuration}}
      out:fade={{delay: 0}}
    >
      <path
        class="tag-label-path background"
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tagDirection * cornerRadius)}
      />
      <path
        class="tag-label-path"
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tagDirection * cornerRadius)}
        stroke={data.categories.new_status.color}
        fill={tag.title === 'Country' ? data.categories.new_status.color : 'var(--secWhite)'}
      />
      <g
        class="tag-label-content"
        transform="translate({tag.x2} {tag.y2})"
      >
        <text
          class="tag-text-category"
          text-anchor="{tagDirection === 1 ? 'start' : 'end'}"
          dx={labelArrowWidth * tagDirection}
          dy={tag.textCategoryYOffset}
          fill={tag.title === 'Country' ? 'var(--darkgray)' : data.categories.new_status.color}
        >
          {tag.title}
        </text>
        <text
          class="tag-text-name"
          text-anchor="{tagDirection === 1 ? 'start' : 'end'}"
          dx={labelArrowWidth * tagDirection}
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
/>

<style>
  g {
    user-select: none;
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
    stroke-width: 2;
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