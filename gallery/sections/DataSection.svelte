<script>
  import { DescriptionList, List } from '../../src/index.js';

  const listItems = [
    { id: 'overview', label: 'Overview', description: 'The whole desk', meta: '12' },
    { id: 'members', label: 'Members', meta: '3' },
    { id: 'archive', label: 'Archive', href: '#empty', meta: '24' },
  ];

  const descriptionItems = [
    { term: 'Owner', description: 'Ada Lovelace' },
    { term: 'Status', description: 'Active' },
    { term: 'Location', description: 'Work / Today' },
  ];
</script>

<section id="data" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Data</h2>
  <p class="mt-1 text-xs text-ink-soft">
    A list for rows and a definition list for facts. Both use the same hairline and the same measure.
  </p>
  <div class="mt-4 grid gap-8 md:grid-cols-2">
    <div>
      <h3 class="text-sm font-bold">List</h3>
      <List items={listItems} class="mt-3" />
    </div>
    <div>
      <h3 class="text-sm font-bold">Description</h3>
      <DescriptionList items={descriptionItems} layout="inline" class="mt-3" />
    </div>
  </div>
</section>
