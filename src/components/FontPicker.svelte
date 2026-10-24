<script>
  /**
   * A choice of typeface: one card per face, each set in its own face so the
   * choice is seen, not described. It is a radio group. `apply` also writes the
   * choice to `data-font` on the root, which is how the kit's `--ui-font`
   * follows it; a host that stores the choice itself leaves `apply` off and
   * reacts to `change`. `options` defaults to the kit's three faces; a host
   * adds its own entries (`{ id, name, category, note, family }`).
   */
  import { createEventDispatcher } from 'svelte';
  import { fonts } from '../fonts.js';

  let counter = 0;

  export let value = 'mono';
  export let options = Object.values(fonts);
  export let label = 'Typeface';
  export let sample = 'The quick brown fox, Съешь же ещё этих мягких булок';
  export let apply = false;
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const name = `ui-font-picker-${++counter}`;

  $: if (apply && typeof document !== 'undefined') document.documentElement.dataset.font = value;

  function pick(option) {
    if (disabled || option.id === value) return;
    value = option.id;
    dispatch('change', { value: option.id, option });
  }
</script>

<fieldset class="min-w-0 {className}" {disabled}>
  <legend class="mb-2 text-whisper uppercase tracking-widest text-ink-faint">{label}</legend>
  <div class="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
    {#each options as option (option.id)}
      <label
        class="flex min-w-0 cursor-pointer flex-col gap-2 rounded-ui border p-4 transition-colors duration-fast has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 {value ===
        option.id
          ? 'border-ink bg-surface'
          : 'border-line hover:border-line-strong'} {disabled ? 'cursor-not-allowed opacity-50' : ''}"
      >
        <input
          type="radio"
          {name}
          value={option.id}
          checked={value === option.id}
          {disabled}
          class="sr-only"
          on:change={() => pick(option)}
        />
        <span class="text-3xl leading-none" style="font-family: {option.family};" aria-hidden="true">Aa</span>
        <span class="text-sm font-bold text-ink">{option.name}</span>
        <span class="text-whisper uppercase tracking-widest text-ink-faint">{option.category}</span>
        {#if option.note}
          <span class="text-xs leading-relaxed text-ink-soft">{option.note}</span>
        {/if}
        <span class="truncate text-xs text-ink-soft" style="font-family: {option.family};">{sample}</span>
      </label>
    {/each}
  </div>
</fieldset>
