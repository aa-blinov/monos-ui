<script>
  /**
   * Keeps Tab inside a region. It is a small utility for custom overlays, not a
   * dialog: the owner still handles Escape, the backdrop and the close.
   */
  import { onDestroy, tick } from 'svelte';

  export let active = true;
  export let initialFocus = null;
  export let returnFocus = true;

  let className = '';
  export { className as class };

  let host;
  let wasActive = false;
  let previous = null;

  function focusables() {
    if (!host) return [];
    const candidates = [
      ...host.querySelectorAll(
        'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      ),
    ];
    const visible = candidates.filter((element) => element.offsetParent !== null);
    return visible.length ? visible : candidates;
  }

  async function activate() {
    if (typeof document === 'undefined') return;
    previous = document.activeElement;
    await tick();
    if (!active) return;
    const next = initialFocus || focusables()[0] || host;
    next?.focus();
  }

  function deactivate() {
    if (returnFocus && previous && typeof previous.focus === 'function') previous.focus();
    previous = null;
  }

  $: if (host && active && !wasActive) {
    wasActive = true;
    void activate();
  }
  $: if (host && !active && wasActive) {
    wasActive = false;
    deactivate();
  }

  onDestroy(() => {
    if (wasActive) deactivate();
  });

  function onKeydown(event) {
    if (!active || event.key !== 'Tab') return;
    const all = focusables();
    if (!all.length) return;
    const first = all[0];
    const last = all[all.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === host)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div bind:this={host} tabindex="-1" class={className}>
  <slot />
</div>
