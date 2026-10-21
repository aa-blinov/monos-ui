<script>
  /**
   * A panel that slides in from the side. It is a modal dialog: focus is held,
   * the page does not scroll, Escape closes it, and focus returns to whatever
   * opened it. Use it for navigation or a long filter form on a phone.
   */
  import { createEventDispatcher, onDestroy, tick } from 'svelte';
  import IconButton from './IconButton.svelte';

  let counter = 0;

  export let open = false;
  export let title = '';
  export let description = '';
  export let side = 'right';
  export let size = 'md';
  export let closeLabel = 'Close';
  export let closeOnBackdrop = true;
  export let closeOnEscape = true;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const uid = ++counter;
  const titleId = `ui-drawer-title-${uid}`;
  const descriptionId = `ui-drawer-description-${uid}`;
  const sizes = { sm: 'max-w-xs', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };

  let panel;
  let lastFocused = null;
  let wasOpen = false;
  let previousOverflow = '';

  function focusables() {
    if (!panel) return [];
    return [
      ...panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.offsetParent !== null || element === document.activeElement);
  }

  async function activate() {
    lastFocused = typeof document !== 'undefined' ? document.activeElement : null;
    if (typeof document !== 'undefined') {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    await tick();
    panel?.focus();
  }

  function deactivate() {
    if (typeof document !== 'undefined') document.body.style.overflow = previousOverflow;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  $: if (open && !wasOpen) {
    wasOpen = true;
    void activate();
  }
  $: if (!open && wasOpen) {
    wasOpen = false;
    deactivate();
  }

  onDestroy(() => {
    if (wasOpen && typeof document !== 'undefined') document.body.style.overflow = previousOverflow;
  });

  function requestClose() {
    open = false;
    dispatch('close');
  }

  function onKeydown(event) {
    if (!open) return;
    if (event.key === 'Escape' && closeOnEscape) {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const all = focusables();
    if (!all.length) {
      event.preventDefault();
      panel?.focus();
      return;
    }
    const first = all[0];
    const last = all[all.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
  <div class="fixed inset-0 z-modal">
    {#if closeOnBackdrop}
      <button
        type="button"
        tabindex="-1"
        aria-label={closeLabel}
        class="absolute inset-0 h-full w-full cursor-default bg-black/20 backdrop-blur-sm"
        on:click={requestClose}
      ></button>
    {:else}
      <div class="absolute inset-0 h-full w-full bg-black/20 backdrop-blur-sm" aria-hidden="true"></div>
    {/if}
    <section
      bind:this={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      tabindex="-1"
      class="ui-drawer absolute inset-y-0 {side === 'left'
        ? 'left-0 border-r'
        : 'right-0 border-l'} w-full overflow-y-auto border-line bg-canvas p-6 text-ink shadow-overlay outline-none {sizes[
        size
      ] || sizes.md} {className}"
      style="--ui-drawer-from: {side === 'left' ? '-100%' : '100%'};"
    >
      <IconButton
        label={closeLabel}
        variant="ghost"
        size="sm"
        tooltipText=""
        class="absolute right-3 top-3"
        on:click={requestClose}
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </IconButton>

      {#if title}
        <h2 id={titleId} class="pr-10 text-lg font-bold tracking-tight">{title}</h2>
      {/if}
      {#if description}
        <p id={descriptionId} class="mt-1.5 text-xs leading-relaxed text-ink-soft">{description}</p>
      {/if}

      <div class="mt-4">
        <slot />
      </div>

      {#if $$slots.footer}
        <div class="mt-6 flex flex-wrap justify-end gap-3">
          <slot name="footer" />
        </div>
      {/if}
    </section>
  </div>
{/if}

<style>
  .ui-drawer {
    animation: ui-drawer-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes ui-drawer-in {
    from {
      opacity: 0.6;
      transform: translateX(var(--ui-drawer-from));
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-drawer {
      animation: none;
    }
  }
</style>
