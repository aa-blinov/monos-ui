<script context="module">
  let counter = 0;
</script>

<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * A labelled field. `underline` is the form-row look; `boxed` is a distinct
   * object for search-like input. The height is a step, never derived from
   * padding, so `<input>` and `<select>` share a baseline.
   *
   * variant: underline | boxed
   * size:    sm | md | lg
   */
  export let value = '';
  export let label = '';
  export let hint = '';
  export let error = '';
  export let id = '';
  export let type = 'text';
  export let name = '';
  export let placeholder = '';
  export let autocomplete = undefined;
  export let size = 'md';
  export let variant = 'underline';
  export let disabled = false;
  export let required = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  function onInput(event) {
    value = event.currentTarget.value;
    dispatch('input', event);
  }

  function forward(name, event) {
    dispatch(name, event);
  }

  const fallbackId = `ui-field-${++counter}`;
  $: fieldId = id || fallbackId;
  $: describedBy =
    [hint ? `${fieldId}-hint` : '', error ? `${fieldId}-error` : ''].filter(Boolean).join(' ') || undefined;

  const sizes = {
    sm: 'h-7 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-11 text-sm',
  };

  $: shape =
    variant === 'boxed'
      ? `rounded-ui border bg-surface px-3 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`
      : `border-b bg-transparent px-1 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`;
</script>

<div class={className}>
  {#if label}
    <label for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">{label}</label>
  {/if}
  <input
    id={fieldId}
    {type}
    {name}
    {placeholder}
    {disabled}
    {required}
    {autocomplete}
    {value}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
    class="w-full text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint disabled:cursor-not-allowed disabled:opacity-50 {sizes[
      size
    ] || sizes.md} max-sm:h-11 {shape}"
    on:input={onInput}
    on:change={(event) => forward('change', event)}
    on:keydown={(event) => forward('keydown', event)}
    on:focus={(event) => forward('focus', event)}
    on:blur={(event) => forward('blur', event)}
    {...$$restProps}
  />
  {#if error}
    <p id="{fieldId}-error" class="mt-1.5 text-xs text-danger-text">{error}</p>
  {:else if hint}
    <p id="{fieldId}-hint" class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
