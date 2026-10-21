<script>
  /**
   * A responsive grid. With `columns` it uses equal tracks; with `min` it uses
   * auto-fit, so the number of columns follows the space instead of a
   * breakpoint.
   */
  export let as = 'div';
  export let columns = 2;
  export let gap = 'md';
  export let min = '';

  let className = '';
  export { className as class };

  const columnsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  const gaps = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
  };

  $: style = min ? `grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr));` : undefined;
</script>

<svelte:element
  this={as}
  class="grid {min ? '' : columnsMap[columns] || columnsMap[2]} {gaps[gap] || gaps.md} {className}"
  {style}
  {...$$restProps}
>
  <slot />
</svelte:element>
