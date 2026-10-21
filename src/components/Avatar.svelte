<script>
  /**
   * A person or product mark. With a picture it shows the picture; without one,
   * the initials of the name. A failed image falls back to the initials too.
   * `status` is a small dot: online, away or offline.
   */
  export let src = '';
  export let alt = '';
  export let name = '';
  export let size = 'md';
  export let status = undefined;

  let className = '';
  export { className as class };

  const sizes = {
    xs: 'h-6 w-6 text-whisper',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-sm',
    xl: 'h-16 w-16 text-base',
  };

  const statusSizes = {
    xs: 'h-1.5 w-1.5 border',
    sm: 'h-2 w-2 border',
    md: 'h-2.5 w-2.5 border-2',
    lg: 'h-2.5 w-2.5 border-2',
    xl: 'h-3 w-3 border-2',
  };

  const statuses = {
    online: 'bg-success',
    away: 'bg-warning',
    offline: 'bg-ink-muted',
  };

  let failed = false;
  $: if (src) failed = false;
  $: initials = String(name || alt || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || '?';
  $: label = alt || name || 'Avatar';
</script>

<span class="relative inline-flex shrink-0 items-center justify-center {sizes[size] || sizes.md} {className}">
  <span class="inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-line bg-surface-2 text-ink-soft">
    {#if src && !failed}
      <img {src} alt={alt || name} class="h-full w-full object-cover" on:error={() => (failed = true)} />
    {:else}
      <span role="img" aria-label={label} class="select-none font-bold uppercase tracking-wide">{initials}</span>
    {/if}
  </span>
  {#if status}
    <span class="absolute bottom-0 right-0 rounded-full border-canvas {statusSizes[size] || statusSizes.md} {statuses[status] || statuses.offline}" aria-hidden="true"></span>
  {/if}
</span>
