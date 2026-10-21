<script>
  /**
   * A centred page column with a maximum measure and the kit's gutters. It is a
   * layout primitive, not an app shell: pass `as="main"` when it is the page.
   */
  export let as = 'div';
  export let size = 'lg';
  export let padded = true;

  let className = '';
  export { className as class };

  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };
</script>

<svelte:element
  this={as}
  class="mx-auto w-full {padded ? 'px-4 sm:px-6' : ''} {sizes[size] || sizes.lg} {className}"
  {...$$restProps}
>
  <slot />
</svelte:element>
