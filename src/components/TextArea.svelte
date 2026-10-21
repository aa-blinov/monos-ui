<script context="module">
  let counter = 0;
</script>

<script>
  /** A multi-line field with the same label, hint and error rhythm as TextField. */
  export let value = '';
  export let label = '';
  export let hint = '';
  export let error = '';
  export let id = '';
  export let name = '';
  export let placeholder = '';
  export let rows = 4;
  export let variant = 'underline';
  export let disabled = false;
  export let required = false;

  let className = '';
  export { className as class };

  const fallbackId = `ui-textarea-${++counter}`;
  $: fieldId = id || fallbackId;
  $: describedBy = [hint ? `${fieldId}-hint` : '', error ? `${fieldId}-error` : ''].filter(Boolean).join(' ') || undefined;

  $: shape = variant === 'boxed'
    ? `rounded-ui border bg-surface px-3 py-2 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`
    : `border-b bg-transparent px-1 py-2 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`;
</script>

<div class={className}>
  {#if label}
    <label for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">{label}</label>
  {/if}
  <textarea
    id={fieldId}
    {name}
    {placeholder}
    {rows}
    {disabled}
    {required}
    bind:value
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
    class="w-full resize-y text-sm text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint disabled:cursor-not-allowed disabled:opacity-50 {shape}"
    on:input
    on:change
    on:keydown
    on:focus
    on:blur
    {...$$restProps}
  />
  {#if error}
    <p id="{fieldId}-error" class="mt-1.5 text-xs text-danger-text">{error}</p>
  {:else if hint}
    <p id="{fieldId}-hint" class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
