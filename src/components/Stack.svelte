<script>
  /**
   * A one-dimensional flex stack. `direction="row"` is the same component with
   * a different axis; the gap comes from the spacing scale, not a pixel value.
   */
  export let as = 'div';
  export let direction = 'column';
  export let gap = 'md';
  export let align = 'stretch';
  export let justify = 'start';
  export let wrap = false;

  let className = '';
  export { className as class };

  const gaps = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
  };

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };
</script>

<svelte:element
  this={as}
  class="flex {direction === 'row' ? 'flex-row' : 'flex-col'} {gaps[gap] || gaps.md} {aligns[align] || aligns.stretch} {justifies[justify] || justifies.start} {wrap ? 'flex-wrap' : 'flex-nowrap'} {className}"
  {...$$restProps}
>
  <slot />
</svelte:element>
