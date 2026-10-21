<script>
  /**
   * A drop zone and a file list. The component owns the picking and the list,
   * not the upload: `files` is a bindable array of File objects, and `change`
   * fires when it changes. The browser filters the picker by `accept`; a drop
   * is not filtered, because the browser has already handed it over.
   */
  import { createEventDispatcher } from 'svelte';

  let counter = 0;

  export let files = [];
  export let accept = '';
  export let multiple = true;
  export let disabled = false;
  export let label = 'Drop files here';
  export let chooseLabel = 'Choose files';
  export let removeLabel = 'Remove';
  export let hint = '';
  export let error = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const fieldId = `ui-upload-${++counter}`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  $: describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  let inputEl;
  let dragging = false;

  function addFiles(list) {
    if (disabled || !list?.length) return;
    const incoming = [...list];
    files = multiple ? [...files, ...incoming] : incoming.slice(0, 1);
    dispatch('change', files);
    if (inputEl) inputEl.value = '';
  }

  function openPicker() {
    if (disabled) return;
    inputEl?.click();
  }

  function onKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  }

  function onDrop(event) {
    dragging = false;
    if (disabled) return;
    addFiles(event.dataTransfer?.files);
  }

  function remove(index) {
    files = files.filter((_, at) => at !== index);
    dispatch('change', files);
  }

  function formatSize(bytes) {
    if (!Number.isFinite(bytes)) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
</script>

<div class={className}>
  <div
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-disabled={disabled ? 'true' : undefined}
    aria-describedby={describedBy}
    class="rounded-ui border border-dashed p-4 text-center transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink {dragging
      ? 'border-ink bg-surface-2'
      : 'border-line bg-surface'} {disabled
      ? 'cursor-not-allowed opacity-50'
      : 'cursor-pointer hover:border-line-strong'}"
    on:click={openPicker}
    on:keydown={onKeydown}
    on:dragover|preventDefault={() => {
      if (!disabled) dragging = true;
    }}
    on:dragleave={() => (dragging = false)}
    on:drop|preventDefault={onDrop}
  >
    <input
      bind:this={inputEl}
      id={fieldId}
      type="file"
      {accept}
      {multiple}
      {disabled}
      tabindex="-1"
      aria-hidden="true"
      class="sr-only"
      on:click|stopPropagation
      on:change={(event) => addFiles(event.currentTarget.files)}
    />
    <svg class="mx-auto h-5 w-5 text-ink-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 16V4m0 0L8 8m4-4 4 4M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <p class="mt-2 text-sm font-bold text-ink">{label}</p>
    <p class="mt-0.5 text-xs text-ink-soft">{chooseLabel}</p>
  </div>

  {#if files.length}
    <ul class="mt-3 divide-y divide-line border-y border-line">
      {#each files as file, index (file.name + file.size + index)}
        <li class="flex items-center justify-between gap-3 py-2">
          <span class="min-w-0">
            <span class="block truncate text-xs text-ink">{file.name}</span>
            <span class="mt-0.5 block text-whisper uppercase tracking-widest text-ink-faint"
              >{formatSize(file.size)}</span
            >
          </span>
          <button
            type="button"
            aria-label="{removeLabel} {file.name}"
            class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-ui text-ink-faint transition-colors duration-fast hover:text-ink max-sm:h-11 max-sm:w-11"
            on:click={() => remove(index)}
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if error}
    <p id={errorId} class="mt-1.5 text-xs text-danger-text">{error}</p>
  {:else if hint}
    <p id={hintId} class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
