<script>
  import { Table } from '../../src/index.js';

  let tableSort = { key: 'name', direction: 'asc' };
  let tableSelected = [];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'kind', label: 'Kind' },
    { key: 'size', label: 'Size', align: 'right', sortable: true },
  ];

  const tableRows = [
    { id: 'board', name: 'Board', kind: 'View', size: 12 },
    { id: 'today', name: 'Today', kind: 'View', size: 4 },
    { id: 'archive', name: 'Archive', kind: 'Folder', size: 128 },
  ];
</script>

<section id="table" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Table</h2>
  <p class="mt-1 text-xs text-ink-soft">
    Sortable headers, selection, a sticky header. Cell content comes through one slot.
  </p>
  <div class="mt-4">
    <Table
      columns={tableColumns}
      rows={tableRows}
      bind:sort={tableSort}
      bind:selected={tableSelected}
      selectable
      caption="Files in this folder"
    >
      <svelte:fragment slot="cell" let:column let:value>
        {#if column.key === 'name'}
          <span class="font-bold text-ink">{value}</span>
        {:else if column.key === 'size'}
          {value} MB
        {:else}
          {value}
        {/if}
      </svelte:fragment>
    </Table>
  </div>
  <p class="mt-2 text-whisper uppercase tracking-widest text-ink-faint">
    {tableSelected.length} selected, sorted by {tableSort ? `${tableSort.key} ${tableSort.direction}` : 'nothing'}
  </p>
</section>
