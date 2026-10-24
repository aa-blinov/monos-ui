<script>
  export let index = 1;
  export let id = '';
  export let name = '';
  export let hint = '';
</script>

<div {id} class="mt-20 scroll-mt-20 border-t border-line pt-6">
  <p class="text-whisper uppercase tracking-widest text-ink-faint">Part {index}</p>
  <h2 class="mt-1 text-2xl font-bold tracking-tight">{name}</h2>
  {#if hint}
    <p class="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{hint}</p>
  {/if}
</div>
