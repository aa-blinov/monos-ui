<script>
  /**
   * A surface. `interactive` lifts it by half a pixel and deepens the border on
   * hover, and makes the card a button (Enter and Space included). `selected`
   * keeps it marked without a fill. The element is `div` by default, so a card
   * can be a link, a button or a section.
   */
  export let as = 'div';
  export let padding = 'md';
  export let interactive = false;
  export let selected = false;

  let className = '';
  export { className as class };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  $: classes = `relative block rounded-ui border bg-surface text-ink shadow-rest ${selected ? 'border-ink-soft' : 'border-line'} ${interactive ? 'cursor-pointer transition duration-fast hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0' : ''} ${paddings[padding] ?? paddings.md} ${className}`;

  function onKeydown(event) {
    if (as === 'button' || as === 'a') return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }
</script>

{#if interactive}
  <svelte:element
    this={as}
    role={as === "button" || as === "a" ? undefined : "button"}
    tabindex={as === "button" || as === "a" ? undefined : 0}
    class={classes}
    on:click
    on:keydown={onKeydown}
    on:focus
    on:blur
    {...$$restProps}
  >
    <slot />
  </svelte:element>
{:else}
  <svelte:element this={as} class={classes} {...$$restProps}>
    <slot />
  </svelte:element>
{/if}
