<script>
  /**
   * A panel that rises from the bottom edge, the phone form of a modal. It is a
   * dialog: focus is held, the page does not scroll, Escape and a tap on the
   * backdrop close it, and focus returns to whatever opened it. A drag down on
   * the handle past `dismissDistance` closes it too. `snap` caps the height:
   * `half` is half the screen, `full` leaves a strip of the page above.
   */
  import { createEventDispatcher, onDestroy, tick } from 'svelte';

  let counter = 0;

  export let open = false;
  export let title = '';
  export let description = '';
  export let snap = 'auto';
  export let closeLabel = 'Close';
  export let closeOnBackdrop = true;
  export let closeOnEscape = true;
  export let dismissDistance = 96;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const uid = ++counter;
  const titleId = `ui-sheet-title-${uid}`;
  const descriptionId = `ui-sheet-description-${uid}`;
  const snaps = { auto: 'max-h-[85dvh]', half: 'h-[50dvh]', full: 'h-[calc(100dvh-2.5rem)]' };

  let panel;
  let lastFocused = null;
  let wasOpen = false;
  let previousOverflow = '';
  let dragStart = null;
  let dragOffset = 0;

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
    dragStart = null;
    dragOffset = 0;
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

  function dragDown(event) {
    dragStart = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function dragMove(event) {
    if (dragStart === null) return;
    dragOffset = Math.max(0, event.clientY - dragStart);
  }

  function dragUp() {
    if (dragStart === null) return;
    const far = dragOffset >= dismissDistance;
    dragStart = null;
    dragOffset = 0;
    if (far) requestClose();
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
      class="ui-sheet absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-lg flex-col rounded-t-ui border border-b-0 border-line bg-canvas text-ink shadow-overlay outline-none {snaps[
        snap
      ] || snaps.auto} {className}"
      style="padding-bottom: var(--ui-safe-bottom); transform: translateY({dragOffset}px);{dragStart === null
        ? ''
        : ' transition: none;'}"
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        class="flex h-6 shrink-0 cursor-grab touch-none items-center justify-center"
        on:pointerdown={dragDown}
        on:pointermove={dragMove}
        on:pointerup={dragUp}
        on:pointercancel={dragUp}
      >
        <span class="h-1 w-9 rounded-full bg-line-strong" aria-hidden="true"></span>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
        {#if title}
          <h2 id={titleId} class="text-lg font-bold tracking-tight">{title}</h2>
        {/if}
        {#if description}
          <p id={descriptionId} class="mt-1.5 text-xs leading-relaxed text-ink-soft">{description}</p>
        {/if}
        <div class={title || description ? 'mt-4' : ''}>
          <slot />
        </div>
        {#if $$slots.footer}
          <div class="mt-6 flex flex-wrap justify-end gap-3">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </section>
  </div>
{/if}

<style>
  .ui-sheet {
    animation: ui-sheet-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    transition: transform 160ms ease-out;
  }
  @keyframes ui-sheet-in {
    from {
      opacity: 0.6;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-sheet {
      animation: none;
      transition: none;
    }
  }
</style>
