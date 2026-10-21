<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A tab list. `items` are data; the panel content comes through the `panel`
   * slot, which receives the active id. The list follows the WAI-ARIA tabs
   * pattern: one tab is in the tab order, arrows and Home/End move and select.
   *
   *   <Tabs items={tabs} bind:value>
   *     <svelte:fragment slot="panel" let:active>…</svelte:fragment>
   *   </Tabs>
   */
  import { createEventDispatcher, tick } from 'svelte';

  export let items = [];
  export let value = '';
  export let label = '';
  export let variant = 'line';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const baseId = `ui-tabs-${++counter}`;
  const panelId = `${baseId}-panel`;
  let listEl;

  $: if (items.length && !items.some((item) => item.id === value && !item.disabled)) {
    const first = items.find((item) => !item.disabled);
    if (first) value = first.id;
  }

  $: activeTabId = `${baseId}-tab-${value}`;

  function select(item) {
    if (item.disabled || item.id === value) return;
    value = item.id;
    dispatch('change', value);
  }

  function tabClass(item) {
    const base = 'inline-flex items-center whitespace-nowrap text-xs uppercase tracking-widest max-sm:min-h-11 transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-30';
    if (variant === 'pill') {
      return `min-h-7 rounded-ui px-3 ${base} ${value === item.id ? 'bg-canvas text-ink shadow-rest' : 'text-ink-soft hover:text-ink'}`;
    }
    return `-mb-px border-b-2 px-0.5 pb-2 pt-1 ${base} ${value === item.id ? 'border-ink font-bold text-ink' : 'border-transparent text-ink-faint hover:text-ink'}`;
  }

  async function onKeydown(event, index) {
    const enabled = items.map((item, at) => ({ item, at })).filter(({ item }) => !item.disabled);
    const position = enabled.findIndex(({ at }) => at === index);
    let next = position;
    if (event.key === 'ArrowRight') next = position + 1;
    else if (event.key === 'ArrowLeft') next = position - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = enabled.length - 1;
    else return;
    event.preventDefault();
    if (!enabled.length) return;
    const wrapped = (next + enabled.length) % enabled.length;
    select(enabled[wrapped].item);
    await tick();
    listEl?.querySelector('[role="tab"][tabindex="0"]')?.focus();
  }
</script>

<div class={className}>
  <div
    bind:this={listEl}
    role="tablist"
    aria-label={label || undefined}
    class={variant === 'pill'
      ? 'inline-flex max-w-full overflow-x-auto rounded-ui border border-line bg-surface p-0.5'
      : 'flex max-w-full gap-6 overflow-x-auto border-b border-line'}
  >
    {#each items as item, index}
      <button
        type="button"
        role="tab"
        id="{baseId}-tab-{item.id}"
        aria-selected={value === item.id}
        aria-controls={$$slots.panel ? panelId : undefined}
        tabindex={value === item.id ? 0 : -1}
        disabled={item.disabled}
        class={tabClass(item)}
        on:click={() => select(item)}
        on:keydown={(event) => onKeydown(event, index)}
      >
        {item.label}
      </button>
    {/each}
  </div>

  {#if $$slots.panel}
    <div role="tabpanel" id={panelId} aria-labelledby={activeTabId} tabindex="0" class="mt-4 outline-none">
      <slot name="panel" active={value} />
    </div>
  {/if}
</div>
