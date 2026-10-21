<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * One choice out of a few. It is a real radio group: the name is shared, the
   * arrow keys move the way the browser moves radios, and the circle is only
   * round because a radio is round by nature.
   */
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let options = [];
  export let label = '';
  export let name = '';
  export let orientation = 'vertical';
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const fallbackName = `ui-radio-${++counter}`;
  $: groupName = name || fallbackName;

  function choose(option) {
    if (disabled || option.disabled) return;
    value = option.value;
    dispatch('change', value);
  }
</script>

<div
  role="radiogroup"
  aria-label={label || undefined}
  class="flex {orientation === 'horizontal' ? 'flex-wrap gap-x-5 gap-y-2' : 'flex-col gap-2'} {className}"
>
  {#each options as option}
    <label
      class="group flex min-h-6 items-start gap-2.5 max-sm:min-h-11 {disabled || option.disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer'}"
    >
      <span class="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="radio"
          name={groupName}
          value={option.value}
          checked={value === option.value}
          disabled={disabled || option.disabled}
          class="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none rounded-full border border-line bg-canvas transition-colors duration-fast checked:border-ink checked:bg-ink disabled:cursor-not-allowed"
          on:change={() => choose(option)}
        />
        <span
          class="pointer-events-none absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-canvas opacity-0 peer-checked:opacity-100"
        ></span>
      </span>
      <span class="min-w-0">
        <span class="block text-xs text-ink-soft transition-colors duration-fast group-hover:text-ink"
          >{option.label ?? option.value}</span
        >
        {#if option.description}
          <span class="mt-0.5 block text-whisper text-ink-faint">{option.description}</span>
        {/if}
      </span>
    </label>
  {/each}
</div>
