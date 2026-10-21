<script>
  /**
   * A native range, themed. The thumb is a circle because it is round by
   * nature; the track and the row keep the kit's rhythm. Keyboard behaviour is
   * the browser's: arrows, Home/End and PageUp/PageDown all work.
   */
  import { createEventDispatcher } from 'svelte';

  let counter = 0;

  export let value = 0;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let label = '';
  export let id = '';
  export let hint = '';
  export let error = '';
  export let disabled = false;
  export let showValue = true;
  export let format = null;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const fallbackId = `ui-slider-${++counter}`;
  $: fieldId = id || fallbackId;
  $: hintId = `${fieldId}-hint`;
  $: errorId = `${fieldId}-error`;

  $: span = max - min;
  $: percent = span > 0 ? ((value - min) / span) * 100 : 0;
  $: shown = format ? format(value) : value;
  $: describedBy = error ? errorId : hint ? hintId : undefined;

  function onInput(event) {
    value = Number(event.currentTarget.value);
    dispatch('input', value);
  }

  function onChange(event) {
    value = Number(event.currentTarget.value);
    dispatch('change', value);
  }
</script>

<div class={className}>
  <div class="flex items-baseline justify-between gap-4">
    <label for={fieldId} class="block text-xs uppercase tracking-widest text-ink-soft">{label}</label>
    {#if showValue}
      <span class="text-xs tabular-nums text-ink-soft" aria-hidden="true">{shown}</span>
    {/if}
  </div>
  <input
    id={fieldId}
    type="range"
    {min}
    {max}
    {step}
    {value}
    {disabled}
    aria-describedby={describedBy}
    aria-valuetext={String(shown)}
    style="--ui-slider-fill: {percent}%"
    class="ui-slider mt-1 w-full"
    on:input={onInput}
    on:change={onChange}
  />
  {#if error}
    <p id={errorId} class="mt-1 text-xs text-danger-text" role="alert">{error}</p>
  {:else if hint}
    <p id={hintId} class="mt-1 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>

<style>
  .ui-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 24px;
    cursor: pointer;
    background: transparent;
  }
  .ui-slider:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .ui-slider::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: var(--ui-radius);
    background: linear-gradient(
      to right,
      var(--ui-ink) 0,
      var(--ui-ink) var(--ui-slider-fill),
      var(--ui-surface-2) var(--ui-slider-fill),
      var(--ui-surface-2) 100%
    );
  }
  .ui-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    width: 16px;
    margin-top: -6px;
    border: 2px solid var(--ui-canvas);
    border-radius: 9999px;
    background: var(--ui-ink);
  }
  .ui-slider::-moz-range-track {
    height: 4px;
    border-radius: var(--ui-radius);
    background: var(--ui-surface-2);
  }
  .ui-slider::-moz-range-progress {
    height: 4px;
    border-radius: var(--ui-radius);
    background: var(--ui-ink);
  }
  .ui-slider::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border: 2px solid var(--ui-canvas);
    border-radius: 9999px;
    background: var(--ui-ink);
  }
  .ui-slider:focus-visible {
    outline: 2px solid var(--ui-focus);
    outline-offset: 4px;
    border-radius: var(--ui-radius);
  }
</style>
