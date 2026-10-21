<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * An anchored panel for arbitrary content. The trigger is a slot; the panel is
   * a non-modal dialog. It closes on Escape or an outside pointerdown, and flips
   * above the trigger when there is no room below.
   *
   *   <Popover label="Filters" bind:open>
   *     <svelte:fragment slot="trigger" let:toggle let:open let:triggerProps>
   *       <Button on:click={toggle} {...triggerProps}>Filters</Button>
   *     </svelte:fragment>
   *     …content…
   *   </Popover>
   */
  import { createEventDispatcher, tick } from 'svelte';

  export let open = false;
  export let placement = 'bottom';
  export let align = 'start';
  export let width = 'md';
  export let label = '';
  export let focusOnOpen = false;
  export let closeOnEscape = true;
  export let closeOnOutside = true;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const panelId = `ui-popover-${++counter}`;
  let anchor;
  let triggerEl;
  let panelEl;
  let flipped = false;

  const widths = {
    sm: 'w-64',
    md: 'w-72',
    lg: 'w-96',
  };

  $: actualPlacement = flipped ? (placement === 'top' ? 'bottom' : 'top') : placement;
  $: positionClass = actualPlacement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
  $: alignClass = align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
  $: triggerProps = {
    'aria-haspopup': 'dialog',
    'aria-expanded': open ? 'true' : 'false',
    'aria-controls': open ? panelId : undefined,
  };

  function triggerNode() {
    return triggerEl || anchor?.querySelector('button, [tabindex="0"], a[href]');
  }

  async function show() {
    if (open) return;
    open = true;
    await tick();
    const trigger = triggerNode();
    if (trigger && panelEl) {
      const rect = trigger.getBoundingClientRect();
      flipped =
        placement === 'bottom'
          ? rect.bottom + panelEl.offsetHeight + 8 > window.innerHeight
          : rect.top - panelEl.offsetHeight - 8 < 0;
    }
    if (focusOnOpen) {
      const first = panelEl?.querySelector(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (first || panelEl)?.focus();
    }
    dispatch('open');
  }

  function close(returnFocus = false) {
    if (!open) return;
    open = false;
    flipped = false;
    if (returnFocus || focusOnOpen) triggerNode()?.focus();
    dispatch('close');
  }

  function toggle() {
    if (open) close();
    else void show();
  }

  function onWindowPointerDown(event) {
    if (open && closeOnOutside && anchor && !anchor.contains(event.target)) close(false);
  }

  function onWindowKeydown(event) {
    if (open && closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      close(true);
    }
  }
</script>

<svelte:window on:pointerdown={onWindowPointerDown} on:keydown={onWindowKeydown} />

<div class="relative inline-block {className}" bind:this={anchor}>
  {#if $$slots.trigger}
    <slot name="trigger" {open} {toggle} {triggerProps} />
  {:else}
    <button
      type="button"
      bind:this={triggerEl}
      {...triggerProps}
      on:click={toggle}
      class="inline-flex min-h-9 items-center gap-2 rounded-ui px-3 text-sm max-sm:min-h-11 text-ink-soft transition-colors duration-fast hover:text-ink"
    >
      {label || 'Open'}
      <svg
        class="h-3.5 w-3.5 transition-transform duration-fast {open ? 'rotate-180' : ''}"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m6 9 6 6 6-6"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  {/if}

  {#if open}
    <div
      bind:this={panelEl}
      id={panelId}
      role="dialog"
      aria-label={label || undefined}
      tabindex="-1"
      class="absolute z-menu max-h-[min(24rem,calc(100dvh-6rem))] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-ui border border-line bg-canvas p-4 shadow-overlay {widths[
        width
      ] || widths.md} {positionClass} {alignClass}"
    >
      <slot />
    </div>
  {/if}
</div>
