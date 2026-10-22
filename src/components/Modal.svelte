<script context="module">
  let counter = 0;
  // Only the top dialog answers Escape or holds Tab: a confirmation over a panel
  // closes alone and focus never leaks to the dialog underneath.
  const openStack = [];
</script>

<script>
  /**
   * A modal panel. It names itself from `title`, holds Tab inside, closes on
   * Escape or a backdrop click, and returns focus to whatever opened it.
   *
   * `open` is bindable; `close` is dispatched. `footer` is a slot, so the
   * actions stay the product's words.
   */
  import { createEventDispatcher, onDestroy, tick } from 'svelte';
  import IconButton from './IconButton.svelte';

  export let open = false;
  export let title = '';
  export let description = '';
  export let size = 'md';
  export let widthClass = '';
  export let titleClass = 'text-lg font-bold tracking-tight';
  export let descriptionClass = 'mt-1.5 text-xs leading-relaxed text-ink-soft';
  export let closeLabel = 'Close';
  export let closeOnBackdrop = true;
  export let closeOnEscape = true;
  export let showClose = true;
  export let role = 'dialog';
  export let initialFocus = null;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const uid = ++counter;
  const token = {};
  const titleId = `ui-modal-title-${uid}`;
  const descriptionId = `ui-modal-description-${uid}`;
  let panel;
  let lastFocused = null;
  let wasOpen = false;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  // Scroll locking is shared: two modals may be open during a transition, and
  // the page must stay locked until the last one closes.
  let locks = 0;
  let previousOverflow = '';

  function lockScroll() {
    if (typeof document === 'undefined') return;
    if (locks === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    locks += 1;
  }

  function unlockScroll() {
    if (typeof document === 'undefined') return;
    locks = Math.max(0, locks - 1);
    if (locks === 0) document.body.style.overflow = previousOverflow;
  }

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
    lockScroll();
    await tick();
    // A control inside the dialog may already have taken focus (a title field that
    // autofocuses). Keep it; otherwise focus the requested control or the panel.
    if (initialFocus) initialFocus.focus();
    else if (!panel?.contains(document.activeElement)) panel?.focus();
  }

  function deactivate() {
    unlockScroll();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  $: if (open && !wasOpen) {
    wasOpen = true;
    openStack.push(token);
    void activate();
  }
  $: if (!open && wasOpen) {
    wasOpen = false;
    openStack.splice(openStack.indexOf(token), 1);
    deactivate();
  }

  // An AlertDialog passes its cancel button, which is bound after the dialog has mounted. Take the focus when
  // that reference arrives, without stealing it later from something the person chose.
  $: if (open && wasOpen && initialFocus && typeof document !== 'undefined' && document.activeElement === panel) {
    initialFocus.focus();
  }

  onDestroy(() => {
    if (!wasOpen) return;
    wasOpen = false;
    openStack.splice(openStack.indexOf(token), 1);
    deactivate();
  });

  function requestClose() {
    open = false;
    dispatch('close');
  }

  function onKeydown(event) {
    if (!open || openStack[openStack.length - 1] !== token) return;
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
  <div class="fixed inset-0 z-modal flex items-center justify-center p-4">
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
      {role}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      tabindex="-1"
      class="relative z-10 max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-ui border border-line bg-canvas p-6 text-ink sm:p-8 shadow-overlay outline-none {widthClass ||
        `w-full ${sizes[size] || sizes.md}`} {className}"
    >
      {#if showClose}
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
      {/if}

      {#if title}
        <h2 id={titleId} class="pr-10 {titleClass}">{title}</h2>
      {/if}
      {#if description}
        <p id={descriptionId} class={descriptionClass}>{description}</p>
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
