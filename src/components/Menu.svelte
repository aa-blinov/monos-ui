<script>
  /**
   * A menu with one trigger. The trigger comes through the `trigger` slot and
   * gets `open`, `toggle` and `triggerProps` (`aria-haspopup`, `aria-expanded`,
   * `disabled`). Items are data: `{ value, label, icon?, disabled?, danger?, separator? }`.
   *
   * Keyboard: ArrowDown opens, ArrowUp/Down move, Home/End jump, Escape closes,
   * Tab closes and returns to the trigger. The menu closes on an outside click.
   */
  import { createEventDispatcher, tick } from 'svelte';

  export let items = [];
  export let label = 'Menu';
  export let align = 'start';
  export let placement = 'bottom';
  export let width = 'menu';
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  let open = false;
  let anchor;
  let menuEl;

  $: triggerProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': open ? 'true' : 'false',
    disabled,
  };

  $: widthClass = width === 'trigger' ? 'w-full' : width === 'auto' ? 'w-max min-w-full max-w-xs' : 'w-56';

  async function toggle() {
    if (disabled) return;
    open = !open;
    if (!open) return;
    await tick();
    focusItem(0);
  }

  function close(returnFocus = true) {
    open = false;
    if (returnFocus) anchor?.querySelector('button, [tabindex="0"]')?.focus();
  }

  function enabledItems() {
    return [...(menuEl?.querySelectorAll('[role="menuitem"]:not([disabled])') || [])];
  }

  function focusItem(index) {
    const all = enabledItems();
    if (!all.length) return;
    const next = (index + all.length) % all.length;
    all[next].focus();
  }

  function choose(item) {
    if (item.disabled) return;
    dispatch('select', item);
    close();
  }

  function onMenuKeydown(event) {
    const all = enabledItems();
    const index = all.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(all.length - 1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      close();
    }
  }

  function onWindowPointerDown(event) {
    if (open && anchor && !anchor.contains(event.target)) open = false;
  }
</script>

<svelte:window on:pointerdown={onWindowPointerDown} />

<div class="relative inline-block {className}" bind:this={anchor}>
  {#if $$slots.trigger}
    <slot name="trigger" {open} {toggle} {triggerProps} />
  {:else}
    <button
      type="button"
      {...triggerProps}
      on:click={toggle}
      class="inline-flex min-h-9 items-center gap-2 rounded-ui px-3 text-sm text-ink-soft transition-colors duration-fast hover:text-ink"
    >
      {label}
      <svg
        class="h-3.5 w-3.5 transition-transform duration-fast {open ? '-rotate-90' : ''}"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m9 6 6 6-6 6"
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
      bind:this={menuEl}
      role="menu"
      aria-label={label}
      tabindex="-1"
      class="absolute z-menu overflow-y-auto rounded-ui border border-line bg-canvas p-1 shadow-overlay {align === 'end'
        ? 'right-0'
        : 'left-0'} {placement === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} {widthClass}"
      on:keydown={onMenuKeydown}
    >
      {#each items as item, index (item.value ?? item.label ?? index)}
        {#if item.separator}
          <div class="my-1 h-px bg-line" role="separator" aria-hidden="true"></div>
        {:else}
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            class="flex min-h-8 w-full items-center max-sm:min-h-11 gap-2.5 rounded-ui px-3 text-left text-sm outline-none transition-colors duration-fast focus:bg-surface focus:text-ink {item.danger
              ? 'text-danger-text hover:bg-[color-mix(in_srgb,var(--ui-danger)_10%,transparent)] hover:text-danger-text'
              : 'text-ink-soft hover:bg-surface hover:text-ink'} disabled:cursor-not-allowed disabled:opacity-30"
            on:click={() => choose(item)}
          >
            {#if item.icon}
              <svelte:component this={item.icon} size={16} strokeWidth="1.7" class="shrink-0" aria-hidden="true" />
            {/if}
            <span class="truncate">{item.label}</span>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
