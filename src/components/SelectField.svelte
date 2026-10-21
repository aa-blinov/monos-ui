<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A labelled native select. The option list stays native on purpose: the
   * system draws it with the right font and keyboard behaviour, and the kit
   * only themes the closed control.
   */
  export let value = '';
  export let label = '';
  export let hint = '';
  export let error = '';
  export let id = '';
  export let name = '';
  export let options = [];
  export let placeholder = '';
  export let size = 'md';
  export let variant = 'underline';
  export let disabled = false;
  export let required = false;

  let className = '';
  export { className as class };

  const fallbackId = `ui-select-${++counter}`;
  $: fieldId = id || fallbackId;
  $: describedBy = [hint ? `${fieldId}-hint` : '', error ? `${fieldId}-error` : ''].filter(Boolean).join(' ') || undefined;

  const sizes = {
    sm: 'h-7 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-11 text-sm',
  };

  $: shape = variant === 'boxed'
    ? `rounded-ui border bg-surface pl-3 pr-9 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`
    : `border-b bg-transparent pl-1 pr-8 ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink-soft'}`;
</script>

<div class={className}>
  {#if label}
    <label for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">{label}</label>
  {/if}
  <div class="relative">
    <select
      id={fieldId}
      {name}
      {disabled}
      {required}
      bind:value
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      class="w-full appearance-none text-ink outline-none transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-50 {sizes[size] || sizes.md} max-sm:h-11 {shape}"
      on:change
      on:focus
      on:blur
      {...$$restProps}
    >
      {#if placeholder}
        <option value="" disabled={required}>{placeholder}</option>
      {/if}
      {#each options as option}
        <option value={option.value} disabled={option.disabled}>{option.label ?? option.value}</option>
      {/each}
    </select>
    <svg class="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
  {#if error}
    <p id="{fieldId}-error" class="mt-1.5 text-xs text-danger">{error}</p>
  {:else if hint}
    <p id="{fieldId}-hint" class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
