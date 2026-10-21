<script>
  /**
   * A page section with vertical rhythm. It carries no heading of its own; put
   * PageHeader inside when the section needs one.
   */
  export let as = 'section';
  export let spacing = 'lg';

  let className = '';
  export { className as class };

  const spacings = {
    none: 'py-0',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16',
  };
</script>

<svelte:element this={as} class="{spacings[spacing] || spacings.lg} {className}" {...$$restProps}>
  <slot />
</svelte:element>
