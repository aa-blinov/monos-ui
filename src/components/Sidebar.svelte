<script>
  /**
   * The shell of a product sidebar: a labelled aside that owns its scroll and
   * the one vertical border. Navigation rows are `SidebarItem`; groups are
   * `SidebarSection`. It does not know what a note is.
   */
  export let as = 'aside';
  export let label = 'Sidebar';
  export let width = '16rem';

  let className = '';
  export { className as class };
</script>

<svelte:element
  this={as}
  aria-label={label || undefined}
  class="flex h-full min-h-0 flex-col border-r border-line bg-canvas {className}"
  style={width ? `width: ${width};` : undefined}
  {...$$restProps}
>
  <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
    <slot />
  </div>
</svelte:element>
