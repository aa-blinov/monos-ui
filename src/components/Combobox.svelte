<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A single choice with a search field. The list is filtered by the typed
   * query; the input is the combobox, the popup is a listbox, and the active
   * option is named by `aria-activedescendant`.
   */
  import { createEventDispatcher, tick } from 'svelte';

  export let value = '';
  export let options = [];
  export let label = '';
  export let placeholder = '';
  export let emptyLabel = 'No results';
  export let clearLabel = 'Clear';
  export let hint = '';
  export let error = '';
  export let disabled = false;
  export let id = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const fallbackId = `ui-combobox-${++counter}`;
  $: fieldId = id || fallbackId;
  $: labelId = `${fieldId}-label`;
  $: listId = `${fieldId}-list`;
  $: hintId = `${fieldId}-hint`;
  $: errorId = `${fieldId}-error`;
  $: describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  let open = false;
  let query = '';
  let highlighted = -1;
  let wrapper;
  let inputEl;
  let listEl;

  $: selected = options.find((option) => option.value === value) || null;
  $: display = open ? query : selected?.label ?? '';
  $: placeholderText = selected?.label ?? placeholder;
  $: normalized = query.trim().toLowerCase();
  $: filtered = options.filter((option) => {
    if (!normalized) return true;
    return String(option.label ?? option.value).toLowerCase().includes(normalized) || String(option.value).toLowerCase().includes(normalized);
  });
  $: if (highlighted >= filtered.length) highlighted = filtered.length - 1;

  function firstEnabled(start = 0, direction = 1) {
    if (!filtered.length) return -1;
    for (let step = 0; step < filtered.length; step += 1) {
      const index = (start + step * direction + filtered.length * filtered.length) % filtered.length;
      if (!filtered[index]?.disabled) return index;
    }
    return -1;
  }

  async function openList() {
    if (disabled) return;
    open = true;
    query = '';
    highlighted = filtered.findIndex((option) => option.value === value && !option.disabled);
    if (highlighted < 0) highlighted = firstEnabled();
    await tick();
    inputEl?.focus();
  }

  function close() {
    open = false;
    query = '';
    highlighted = -1;
  }

  function move(delta) {
    if (!open) {
      void openList();
      return;
    }
    const current = highlighted < 0 ? (delta > 0 ? -1 : 0) : highlighted;
    const next = firstEnabled((current + delta + filtered.length) % filtered.length, delta > 0 ? 1 : -1);
    if (next >= 0) highlighted = next;
  }

  function choose(option) {
    if (!option || option.disabled) return;
    value = option.value;
    dispatch('change', { value, option });
    close();
    void tick().then(() => inputEl?.focus());
  }

  function clear() {
    value = '';
    dispatch('change', { value: '', option: null });
    open = true;
    query = '';
    highlighted = firstEnabled();
    void tick().then(() => inputEl?.focus());
  }

  function onInput(event) {
    query = event.currentTarget.value;
    open = true;
    highlighted = firstEnabled();
  }

  function onKeydown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home' && open) {
      event.preventDefault();
      highlighted = firstEnabled();
    } else if (event.key === 'End' && open) {
      event.preventDefault();
      highlighted = firstEnabled(filtered.length - 1, -1);
    } else if (event.key === 'Enter' && open && highlighted >= 0) {
      event.preventDefault();
      choose(filtered[highlighted]);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab' && open) {
      close();
    }
  }

  function onWindowPointerDown(event) {
    if (open && wrapper && !wrapper.contains(event.target)) close();
  }

  function optionId(index) {
    return `${fieldId}-option-${index}`;
  }

  function optionClass(option, index) {
    const active = index === highlighted;
    return `flex min-h-8 w-full items-center justify-between gap-2 rounded-ui px-2.5 text-left text-sm outline-none transition-colors duration-fast max-sm:min-h-11 ${
      active ? 'bg-surface text-ink' : 'text-ink-soft'
    } ${option.disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:bg-surface hover:text-ink'}`;
  }
</script>

<svelte:window on:pointerdown={onWindowPointerDown} />

<div class="relative {className}" bind:this={wrapper}>
  {#if label}
    <label id={labelId} for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">{label}</label>
  {/if}
  <div class="relative">
    <input
      bind:this={inputEl}
      id={fieldId}
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={open && highlighted >= 0 ? optionId(highlighted) : undefined}
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : undefined}
      autocomplete="off"
      {disabled}
      value={display}
      placeholder={placeholderText}
      class="h-9 w-full border-b bg-transparent px-1 pr-8 text-sm text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint focus:border-ink-soft disabled:cursor-not-allowed disabled:opacity-50 max-sm:h-11 {error ? 'border-danger' : 'border-line'}"
      on:focus={() => { if (!open) void openList(); }}
      on:input={onInput}
      on:keydown={onKeydown}
    />
    {#if value && !disabled}
      <button
        type="button"
        aria-label={clearLabel}
        class="absolute right-0 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-ui text-ink-faint transition-colors duration-fast hover:text-ink max-sm:h-11 max-sm:w-11"
        on:click={clear}
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>
    {/if}

    {#if open}
      <div
        bind:this={listEl}
        id={listId}
        role="listbox"
        aria-labelledby={label ? labelId : undefined}
        class="absolute left-0 right-0 top-full z-menu mt-1 max-h-64 overflow-y-auto rounded-ui border border-line bg-canvas p-1 shadow-overlay"
      >
        {#each filtered as option, index}
          <button
            type="button"
            role="option"
            tabindex="-1"
            id={optionId(index)}
            aria-selected={option.value === value}
            disabled={option.disabled}
            class={optionClass(option, index)}
            on:pointerdown|preventDefault={() => choose(option)}
          >
            <span class="min-w-0 truncate">{option.label ?? option.value}</span>
            {#if option.value === value}
              <svg class="h-3.5 w-3.5 shrink-0 text-ink" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            {/if}
          </button>
        {/each}
        {#if !filtered.length}
          <p class="px-2.5 py-2 text-xs text-ink-faint">{emptyLabel}</p>
        {/if}
      </div>
    {/if}
  </div>
  {#if error}
    <p id={errorId} class="mt-1.5 text-xs text-danger">{error}</p>
  {:else if hint}
    <p id={hintId} class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
