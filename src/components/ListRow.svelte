<script>
  /**
   * One touch row of a phone list: an icon, a title with an optional second
   * line, a value and a chevron. It is at least 44px tall. An anchor when `href`
   * is set and a button otherwise; `navigates` draws the chevron, `danger`
   * colours a destructive row such as "Delete".
   */
  export let title = '';
  export let description = '';
  export let value = '';
  export let href = '';
  export let navigates = false;
  export let danger = false;
  export let disabled = false;

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
  role={href ? 'link' : 'button'}
  class="flex min-h-touch w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-fast hover:bg-surface active:bg-surface {danger
    ? 'text-danger-text'
    : 'text-ink'} {disabled ? 'cursor-not-allowed opacity-50' : ''} {className}"
  on:click
  {...$$restProps}
>
  {#if $$slots.icon}
    <span class="flex h-5 w-5 shrink-0 items-center justify-center {danger ? '' : 'text-ink-soft'}">
      <slot name="icon" />
    </span>
  {/if}
  <span class="min-w-0 flex-1">
    <span class="block truncate text-sm"><slot>{title}</slot></span>
    {#if description}
      <span class="mt-0.5 block truncate text-xs text-ink-faint">{description}</span>
    {/if}
  </span>
  {#if value}
    <span class="max-w-[40%] shrink-0 truncate text-xs text-ink-faint">{value}</span>
  {/if}
  <slot name="trailing" />
  {#if navigates}
    <svg class="h-4 w-4 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  {/if}
</svelte:element>
