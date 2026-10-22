<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A controlled tag field: tags are strings, Enter or a comma adds one,
   * Backspace in an empty field removes the last, and suggestions narrow as
   * the person types. `tags` is bindable; `change` carries the next array.
   */
  import { createEventDispatcher, tick } from 'svelte';
  import Chip from './Chip.svelte';

  export let tags = [];
  export let suggestions = [];
  export let label = 'Tags';
  export let placeholder = 'Add a tag';
  export let hint = '';
  export let removeLabel = 'Remove';
  export let ariaLabel = '';
  export let testid = '';
  export let suggestionsTestid = '';
  export let prefix = '';
  export let commitOnBlur = false;
  export let disabled = false;
  export let max = 0;
  export let id = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const uid = ++counter;
  const fieldId = id || `ui-tag-input-${uid}`;
  const hintId = `${fieldId}-hint`;
  const listId = `${fieldId}-suggestions`;

  let value = '';
  let focused = false;
  export let inputEl = null;
  let blurTimer;

  $: query = value.trim().replace(/^#/, '');
  $: filtered = suggestions
    .filter((tag) => !tags.includes(tag))
    .filter((tag) => !query || tag.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6);
  $: showSuggestions = focused && !disabled && filtered.length > 0;

  function commit(next) {
    tags = next;
    dispatch('change', tags);
    dispatch('input', tags);
  }

  function addTag(raw) {
    const tag = String(raw || '')
      .trim()
      .replace(/^#/, '');
    if (!tag || tags.includes(tag) || (max > 0 && tags.length >= max)) return;
    value = '';
    commit([...tags, tag]);
    void tick().then(() => inputEl?.focus());
  }

  function removeTag(index) {
    commit(tags.filter((_, at) => at !== index));
  }

  function onKeydown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(value);
      return;
    }
    if (event.key === 'Backspace' && !value && tags.length) {
      event.preventDefault();
      removeTag(tags.length - 1);
      return;
    }
    if (event.key === 'Escape') {
      focused = false;
      return;
    }
    dispatch('keydown', event);
  }

  function onFocus() {
    clearTimeout(blurTimer);
    focused = true;
  }

  function removeLabelFor(tag) {
    return typeof removeLabel === 'function' ? removeLabel(tag) : removeLabel;
  }

  function onBlur() {
    if (commitOnBlur && value.trim()) addTag(value);
    blurTimer = setTimeout(() => (focused = false), 120);
  }

  function choose(tag) {
    addTag(tag);
  }
</script>

<div class={className}>
  <label id={`${fieldId}-label`} for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft"
    >{label}</label
  >
  <div
    class="flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-ui border border-line bg-canvas px-2 py-1 max-sm:min-h-11 {disabled
      ? 'cursor-not-allowed opacity-50'
      : 'focus-within:border-ink-soft'}"
    role="group"
    aria-labelledby={label ? `${fieldId}-label` : undefined}
    aria-label={!label ? ariaLabel || undefined : undefined}
  >
    {#each tags as tag, index (tag)}
      <Chip removable removeLabel={removeLabelFor(tag)} on:remove={() => removeTag(index)}>{prefix}{tag}</Chip>
    {/each}
    <input
      bind:this={inputEl}
      id={fieldId}
      bind:value
      {disabled}
      {placeholder}
      data-testid={testid || undefined}
      aria-label={!label ? ariaLabel || undefined : undefined}
      aria-describedby={hint ? hintId : undefined}
      aria-autocomplete="list"
      aria-expanded={showSuggestions}
      aria-controls={showSuggestions ? listId : undefined}
      autocomplete="off"
      class="min-w-24 flex-1 border-0 bg-transparent px-1 text-sm text-ink outline-none placeholder:text-ink-faint"
      on:keydown={onKeydown}
      on:focus={onFocus}
      on:blur={onBlur}
    />
  </div>
  {#if hint}
    <p id={hintId} class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
  {#if showSuggestions}
    <div
      id={listId}
      role="group"
      data-testid={suggestionsTestid || undefined}
      class="mt-1 w-full rounded-ui border border-line bg-canvas p-1 shadow-overlay"
    >
      {#each filtered as tag (tag)}
        <button
          type="button"
          class="block w-full rounded-ui px-2 py-1.5 text-left text-sm text-ink-soft transition-colors duration-fast hover:bg-surface hover:text-ink"
          on:mousedown|preventDefault
          on:click={() => choose(tag)}>{prefix}{tag}</button
        >
      {/each}
    </div>
  {/if}
</div>
