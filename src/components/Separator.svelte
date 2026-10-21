<script>
  /**
   * A hairline. Decorative by default; set `decorative={false}` when the break
   * carries meaning and the separator should appear in the accessibility tree.
   */
  export let orientation = 'horizontal';
  export let decorative = true;

  let className = '';
  export { className as class };

  $: vertical = orientation === 'vertical';
</script>

<div
  role={decorative ? undefined : 'separator'}
  aria-orientation={!decorative ? orientation : undefined}
  aria-hidden={decorative ? 'true' : undefined}
  class="shrink-0 bg-line {vertical ? 'min-h-4 w-px self-stretch' : 'h-px w-full'} {className}"
  {...$$restProps}
></div>
