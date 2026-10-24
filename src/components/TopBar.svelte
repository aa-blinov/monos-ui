<script>
  /**
   * The navigation bar of a phone screen: a back control on the left, a title
   * in the middle and up to a few actions on the right. It pads itself with the
   * top safe-area inset, so it sits under a notch without a wrapper.
   *
   * `back` shows the back control and fires `back`; `backLabel` is its name for
   * a screen reader. `leading` replaces it (a menu button, for a root screen).
   */
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte';

  export let title = '';
  export let subtitle = '';
  export let back = false;
  export let backLabel = 'Back';
  export let sticky = true;
  export let bordered = true;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
</script>

<header
  class="{sticky ? 'sticky top-0 z-menu' : ''} bg-canvas text-ink {bordered ? 'border-b border-line' : ''} {className}"
  style="padding-top: var(--ui-safe-top); padding-left: var(--ui-safe-left); padding-right: var(--ui-safe-right);"
>
  <div class="ui-topbar grid h-bar grid-cols-[minmax(2.75rem,1fr)_auto_minmax(2.75rem,1fr)] items-center gap-2 px-2">
    <div class="flex min-w-0 items-center justify-start">
      {#if $$slots.leading}
        <slot name="leading" />
      {:else if back}
        <IconButton
          label={backLabel}
          variant="ghost"
          size="lg"
          tooltipText=""
          class="-ml-1"
          on:click={() => dispatch('back')}
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m15 6-6 6 6 6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </IconButton>
      {/if}
    </div>
    <div class="ui-topbar-title min-w-0 max-w-[55vw] text-center">
      <h1 class="truncate text-sm font-bold tracking-tight">
        <slot>{title}</slot>
      </h1>
      {#if subtitle}
        <p class="ui-wide-only truncate text-whisper uppercase tracking-widest text-ink-faint">{subtitle}</p>
      {/if}
    </div>
    <div class="ui-wide-only flex min-w-0 items-center justify-end gap-1">
      <slot name="actions" />
    </div>
  </div>
</header>
