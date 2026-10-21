<script>
  /**
   * A named group of fields. The legend is the group's name; the hint explains
   * the group before the first control. Native `fieldset` semantics come free.
   */
  export let legend = '';
  export let hint = '';
  export let disabled = false;

  let className = '';
  export { className as class };
</script>

<fieldset {disabled} class="m-0 min-w-0 border-0 p-0 {className}">
  {#if legend}
    <legend class="p-0 text-xs font-bold uppercase tracking-widest text-ink">{legend}</legend>
  {/if}
  {#if hint}
    <p class="mt-1 text-xs leading-relaxed text-ink-faint">{hint}</p>
  {/if}
  <div class="mt-3 space-y-4">
    <slot />
  </div>
</fieldset>
