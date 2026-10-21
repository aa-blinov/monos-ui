<script>
  /**
   * A label, a hint and an error around any control the kit does not wrap (a
   * radio group, a slider, a drop zone). Give the control `forId` and use the
   * slot's `describedBy` on its `aria-describedby`.
   */
  let counter = 0;

  export let label = '';
  export let hint = '';
  export let error = '';
  export let forId = '';
  export let required = false;

  let className = '';
  export { className as class };

  const fallbackId = `ui-form-field-${++counter}`;
  $: fieldId = forId || fallbackId;
  $: hintId = `${fieldId}-hint`;
  $: errorId = `${fieldId}-error`;
  $: describedBy = error ? errorId : hint ? hintId : undefined;
</script>

<div class={className}>
  {#if label}
    {#if forId}
      <label for={forId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
        {label}{#if required}<span class="text-danger-text" aria-hidden="true"> *</span>{/if}
      </label>
    {:else}
      <span class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
        {label}{#if required}<span class="text-danger-text" aria-hidden="true"> *</span>{/if}
      </span>
    {/if}
  {/if}
  <div class="mt-1.5">
    <slot {describedBy} />
  </div>
  {#if error}
    <p id={errorId} class="mt-1.5 text-xs text-danger-text" role="alert">{error}</p>
  {:else if hint}
    <p id={hintId} class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
