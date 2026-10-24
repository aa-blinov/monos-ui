<script>
  import { BottomNav, Badge, Button, Fab, List, ListRow, NavItem, PageHeader, TopBar } from '../src/index.js';

  export let profile = 'iphone';

  let tab = 'notes';

  const notes = [
    { label: 'Meeting notes', description: 'Work, yesterday', meta: 'Today' },
    { label: 'Reading list', description: 'Personal', meta: '3 d' },
    { label: 'Trip to Almaty', description: 'Travel', meta: '1 w' },
    { label: 'Recipes', description: 'Home', meta: '1 m' },
    { label: 'Release checklist', description: 'Work', meta: '2 m' },
  ];

  const tabs = [
    { id: 'notes', label: 'Notes' },
    { id: 'search', label: 'Search' },
    { id: 'tags', label: 'Tags' },
  ];

  const icons = {
    notes: 'M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 5h6m-6 4h6',
    search: 'm20 20-4.2-4.2M16 10.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z',
    tags: 'M4 12V5a1 1 0 0 1 1-1h7l8 8-8 8-8-8zm4-5.5h.01',
  };
</script>

{#if profile === 'desktop' || profile === 'laptop'}
  <div class="flex h-full">
    <aside class="w-52 shrink-0 space-y-1 border-r border-line bg-surface p-3">
      <p class="px-2.5 pb-2 text-whisper uppercase tracking-widest text-ink-faint">Monos</p>
      <NavItem active label="Notes" />
      <NavItem label="Search" />
      <NavItem label="Tags" />
      <NavItem label="Trash" />
    </aside>
    <div class="min-w-0 flex-1 overflow-y-auto p-6">
      <PageHeader title="Notes" description="Everything you wrote, newest first." level={2}>
        <svelte:fragment slot="actions">
          <Button size="sm">New note</Button>
        </svelte:fragment>
      </PageHeader>
      <List class="mt-6" items={notes}>
        <svelte:fragment slot="meta" let:item>
          {#if item.label === 'Release checklist'}<Badge tone="accent">Pinned</Badge>{/if}
        </svelte:fragment>
      </List>
    </div>
  </div>
{:else if profile === 'tablet'}
  <div class="flex h-full flex-col">
    <TopBar sticky={false} title="Notes" subtitle="5 notes">
      <svelte:fragment slot="actions">
        <Button variant="quiet" size="sm">Sort</Button>
      </svelte:fragment>
    </TopBar>
    <div class="grid min-h-0 flex-1 grid-cols-[16rem_minmax(0,1fr)]">
      <div class="overflow-y-auto border-r border-line">
        <div class="divide-y divide-line">
          {#each notes as note, at}
            <ListRow title={note.label} description={note.description} class={at === 0 ? 'bg-surface' : ''} />
          {/each}
        </div>
      </div>
      <div class="overflow-y-auto p-8">
        <h2 class="text-xl font-bold tracking-tight">Meeting notes</h2>
        <p class="mt-1 text-whisper uppercase tracking-widest text-ink-faint">Work, yesterday</p>
        <p class="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
          The tablet keeps the list and the note side by side. Rows are 44px tall for a finger, and the bar carries the
          title with its actions.
        </p>
      </div>
    </div>
  </div>
{:else if profile === 'watch'}
  <div class="flex h-full flex-col">
    <TopBar sticky={false} bordered={false} title="Notes" subtitle="5 notes" />
    <div class="min-h-0 flex-1 divide-y divide-line overflow-y-auto border-t border-line">
      {#each notes.slice(0, 3) as note}
        <ListRow title={note.label} navigates class="!px-3" />
      {/each}
    </div>
    <div class="p-2" style="padding-bottom: var(--ui-safe-bottom);">
      <Button full size="sm">New</Button>
    </div>
  </div>
{:else}
  <div class="relative flex h-full flex-col">
    <TopBar sticky={false} title="Notes" subtitle="5 notes">
      <svelte:fragment slot="actions">
        <Button variant="quiet" size="sm">Sort</Button>
      </svelte:fragment>
    </TopBar>
    <div class="min-h-0 flex-1 divide-y divide-line overflow-y-auto">
      {#each notes as note}
        <ListRow title={note.label} description={note.description} value={note.meta} navigates />
      {/each}
    </div>
    <Fab fixed={false} lift label="New" />
    <BottomNav fixed={false} items={tabs} bind:value={tab} label="Sections">
      <svelte:fragment slot="icon" let:item let:active>
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d={icons[item.id]}
            stroke="currentColor"
            stroke-width={active ? 2 : 1.6}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </svelte:fragment>
    </BottomNav>
  </div>
{/if}
