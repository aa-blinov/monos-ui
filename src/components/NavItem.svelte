<script>
  /**
   * One row of navigation. It is an anchor when `href` is set and a button
   * otherwise; the active row is marked with `aria-current="page"`.
   */
  export let href = '';
  export let active = false;
  export let disabled = false;
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
  class="group flex min-h-9 w-full items-center gap-2.5 text-left rounded-ui px-2.5 text-sm transition-colors duration-fast max-sm:min-h-11 {active ? 'bg-surface font-bold text-ink' : 'text-ink-soft hover:bg-surface hover:text-ink'} {disabled ? 'cursor-not-allowed opacity-50' : ''} {className}"
  on:click
  {...$$restProps}
>
  <slot name="icon" />
  <span class="min-w-0 flex-1 truncate"><slot>{label}</slot></span>
  <slot name="trailing" />
</svelte:element>
