<script>
  /**
   * A themed single choice. Unlike SelectField, which leaves the option list to
   * the operating system, this one draws the list, so a theme picker or a
   * toolbar choice looks like the rest of the kit. It is a listbox: the trigger
   * opens it, arrows and Home/End move, Enter chooses, Escape closes.
   */
  import { createEventDispatcher, tick } from 'svelte';

  export let value = '';
  export let options = [];
  export let label = '';
  export let placeholder = 'Select';
  export let size = 'md';
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  let open = false;
  let anchor;
  let triggerEl;
  let menuEl;
  let placement = 'bottom';

  const sizes = {
    sm: 'h-7 px-2.5 text-xs',
    md: 'h-9 px-3 text-sm',
    lg: 'h-11 px-3 text-sm',
  };

  $: selected = options.find((option) => option.value === value);
  $: display = selected ? (selected.label ?? selected.value) : placeholder;

  async function openMenu(focus = 'selected') {
    if (disabled || open) return;
    open = true;
    await tick();
    const below = triggerEl.getBoundingClientRect().bottom + (menuEl?.offsetHeight || 0) + 8;
    placement = below > window.innerHeight ? 'top' : 'bottom';
    if (focus === 'last') focusOption(-1, true);
    else if (focus === 'first') focusOption(0, true);
    else {
      const current =
        menuEl?.querySelector('[role="option"][aria-selected="true"]') || menuEl?.querySelector('[role="option"]');
      current?.focus();
    }
  }

  function close(returnFocus = true) {
    open = false;
    if (returnFocus) triggerEl?.focus();
  }

  function enabledOptions() {
    return [...(menuEl?.querySelectorAll('[role="option"]:not([disabled])') || [])];
  }

  function focusOption(index, absolute = false) {
    const all = enabledOptions();
    if (!all.length) return;
    const next = absolute ? index : (index + all.length) % all.length;
    all[next]?.focus();
  }

  function move(delta) {
    const all = enabledOptions();
    const current = all.indexOf(document.activeElement);
    focusOption(current + delta);
  }

  function choose(option) {
    if (option.disabled) return;
    value = option.value;
    dispatch('change', { value: option.value, option });
    close();
  }

  async function onTriggerKeydown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) await openMenu(event.key === 'ArrowUp' ? 'last' : 'selected');
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      close();
    }
  }

  function onMenuKeydown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusOption(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusOption(-1, true);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      close();
    }
  }

  function onWindowPointerDown(event) {
    if (open && anchor && !anchor.contains(event.target)) close(false);
  }
</script>

<svelte:window on:pointerdown={onWindowPointerDown} />

<div class="relative {className}" bind:this={anchor}>
  {#if label}
    <span class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">{label}</span>
  {/if}
  <button
    bind:this={triggerEl}
    type="button"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label={label || placeholder}
    {disabled}
    class="flex w-full items-center justify-between gap-2 rounded-ui border border-line bg-surface text-left text-ink outline-none transition-colors duration-fast hover:border-line-strong focus:border-ink-soft disabled:cursor-not-allowed disabled:opacity-50 max-sm:h-11 {sizes[
      size
    ] || sizes.md}"
    on:click={() => (open ? close() : openMenu())}
    on:keydown={onTriggerKeydown}
  >
    <span class="truncate {selected ? '' : 'text-ink-faint'}">{display}</span>
    <svg
      class="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-fast {open ? 'rotate-180' : ''}"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if open}
    <div
      bind:this={menuEl}
      role="listbox"
      aria-label={label || placeholder}
      tabindex="-1"
      class="absolute z-menu max-h-72 w-full overflow-y-auto rounded-ui border border-line bg-canvas p-1 shadow-overlay {placement ===
      'top'
        ? 'bottom-full mb-1'
        : 'top-full mt-1'}"
      on:keydown={onMenuKeydown}
    >
      {#each options as option (option.value)}
        <button
          type="button"
          role="option"
          aria-selected={option.value === value}
          disabled={option.disabled}
          class="flex min-h-8 w-full items-center gap-2 rounded-ui px-2.5 text-left text-sm outline-none transition-colors duration-fast hover:bg-surface hover:text-ink focus:bg-surface focus:text-ink disabled:cursor-not-allowed disabled:opacity-30 max-sm:min-h-11 {option.value ===
          value
            ? 'text-ink'
            : 'text-ink-soft'}"
          on:click={() => choose(option)}
        >
          <span class="truncate">{option.label ?? option.value}</span>
          {#if option.value === value}
            <svg class="ml-auto h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline
                points="20 6 9 17 4 12"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
