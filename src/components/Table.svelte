<script>
  /**
   * A data table with sortable headers and optional selection. Sorting is
   * controlled through `sort` (bindable) and done here by the column key unless
   * `manualSort` is set; selection is a bindable array of row keys.
   *
   * Cells can be plain `row[column.key]` or a `cell` slot:
   *
   *   <Table {columns} {rows} let:row let:column>{row[column.key]}</Table>
   *
   * A row action belongs in a cell, not on the row: a clickable <tr> is not a
   * keyboard control.
   */
  import { createEventDispatcher } from 'svelte';
  import Checkbox from './Checkbox.svelte';

  export let columns = [];
  export let rows = [];
  export let rowKey = 'id';
  export let caption = '';
  export let density = 'comfortable';
  export let selectable = false;
  export let selected = [];
  export let sort = null;
  export let manualSort = false;
  export let stickyHeader = true;
  export let emptyLabel = 'No rows';
  export let selectAllLabel = 'Select all rows';
  export let selectRowLabel = (row, index) => `Select row ${index + 1}`;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const pads = {
    comfortable: 'py-2.5',
    compact: 'py-1.5',
  };

  function keyOf(row, index) {
    if (typeof rowKey === 'function') return rowKey(row);
    return row?.[rowKey] ?? index;
  }

  function valueOf(row, column) {
    return row?.[column.key];
  }

  $: sortedRows = (() => {
    if (!sort || manualSort) return rows;
    const column = columns.find((item) => item.key === sort.key);
    if (!column) return rows;
    const direction = sort.direction === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
      const left = column.sortValue ? column.sortValue(a) : valueOf(a, column);
      const right = column.sortValue ? column.sortValue(b) : valueOf(b, column);
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction;
      return String(left).localeCompare(String(right), undefined, { numeric: true }) * direction;
    });
  })();

  $: keys = sortedRows.map((row, index) => keyOf(row, index));
  $: allSelected = selectable && keys.length > 0 && keys.every((key) => selected.includes(key));
  $: someSelected = selectable && keys.some((key) => selected.includes(key));

  function nextSort(column) {
    if (!column.sortable) return;
    let next;
    if (sort?.key !== column.key) next = { key: column.key, direction: 'asc' };
    else if (sort.direction === 'asc') next = { key: column.key, direction: 'desc' };
    else next = null;
    sort = next;
    dispatch('sort', next);
  }

  function toggleAll() {
    selected = allSelected ? [] : keys;
    dispatch('select', selected);
  }

  function toggleRow(row, index) {
    const key = keyOf(row, index);
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    selected = [...next];
    dispatch('select', selected);
  }

  function ariaSort(column) {
    if (!sort || sort.key !== column.key) return 'none';
    return sort.direction === 'desc' ? 'descending' : 'ascending';
  }
</script>

<div class="w-full overflow-x-auto rounded-ui border border-line {className}">
  <table class="w-full border-collapse text-left text-sm text-ink">
    {#if caption}
      <caption class="sr-only">{caption}</caption>
    {/if}
    <thead class="{stickyHeader ? 'sticky top-0 z-10' : ''} bg-canvas">
      <tr class="border-b border-line">
        {#if selectable}
          <th scope="col" class="w-10 px-3 {pads[density] || pads.comfortable}">
            <Checkbox
              ariaLabel={selectAllLabel}
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              on:change={toggleAll}
            />
          </th>
        {/if}
        {#each columns as column}
          <th
            scope="col"
            aria-sort={column.sortable ? (sort?.key === column.key ? (sort.direction === 'desc' ? 'descending' : 'ascending') : 'none') : undefined}
            style={column.width ? `width: ${column.width}` : undefined}
            class="px-3 {pads[density] || pads.comfortable} text-whisper font-bold uppercase tracking-widest text-ink-faint {aligns[column.align] || aligns.left}"
          >
            {#if column.sortable}
              <button
                type="button"
                class="inline-flex items-center gap-1 text-left transition-colors duration-fast hover:text-ink max-sm:min-h-11"
                on:click={() => nextSort(column)}
              >
                {column.label}
                <svg
                  class="h-3 w-3 shrink-0 {sort?.key === column.key ? 'opacity-100' : 'opacity-30'} {sort?.key === column.key && sort.direction === 'desc' ? '-rotate-180' : ''}"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m6 14 6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            {:else}
              {column.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if sortedRows.length === 0}
        <tr>
          <td colspan={columns.length + (selectable ? 1 : 0)} class="px-3 py-8 text-center text-xs text-ink-faint">
            {#if $$slots.empty}
              <slot name="empty" />
            {:else}
              {emptyLabel}
            {/if}
          </td>
        </tr>
      {:else}
        {#each sortedRows as row, index (keyOf(row, index))}
          <tr class="border-b border-line last:border-b-0 hover:bg-surface">
            {#if selectable}
              <td class="px-3 {pads[density] || pads.comfortable}">
                <Checkbox
                  ariaLabel={selectRowLabel(row, index)}
                  checked={selected.includes(keyOf(row, index))}
                  on:change={() => toggleRow(row, index)}
                />
              </td>
            {/if}
            {#each columns as column}
              <td class="px-3 {pads[density] || pads.comfortable} {aligns[column.align] || aligns.left} text-ink-soft">
                {#if $$slots.cell}
                  <slot name="cell" {row} {column} value={valueOf(row, column)} />
                {:else}
                  {valueOf(row, column) ?? ''}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
