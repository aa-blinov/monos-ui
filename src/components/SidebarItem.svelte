<script>
  /**
   * One row of sidebar navigation. A link when `href` is set, a button
   * otherwise. `depth` indents a tree row; the active row takes the surface.
   */
  export let href = '';
  export let active = false;
  export let disabled = false;
  export let depth = 0;
  export let label = '';

  let className = '';
  export { className as class };
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  href={href && !disabled ? href : undefined}
  type={href ? undefined : 'button'}
  disabled={href ? undefined : disabled}
  aria-disabled={href && disabled ? 'true' : undefined}
  tabindex={href && disabled ? -1 : undefined}
  aria-current={active ? 'page' : undefined}
  role={href ? 'link' : 'button'}
  class="group flex min-h-8 w-full min-w-0 items-center gap-2 rounded-ui px-2 text-left text-sm transition-colors duration-fast max-sm:min-h-11 {active
    ? 'bg-surface font-bold text-ink'
    : 'text-ink-soft hover:bg-surface hover:text-ink'} {disabled ? 'cursor-not-allowed opacity-40' : ''} {className}"
  style="padding-left: calc(0.5rem + {depth} * 0.875rem);"
  on:click
  {...$$restProps}
>
  <slot name="icon" />
  <span class="min-w-0 flex-1 truncate"><slot>{label}</slot></span>
  <slot name="trailing" />
</svelte:element>
