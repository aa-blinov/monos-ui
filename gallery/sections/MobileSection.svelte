<script>
  import { BottomNav, BottomSheet, Button, Fab, ListRow, SegmentedControl, TopBar } from '../../src/index.js';

  let tab = 'notes';
  let phone = 'iphone';
  let sheetOpen = false;
  let sort = 'Recent';

  const tabs = [
    { id: 'notes', label: 'Notes' },
    { id: 'search', label: 'Search', badge: 2 },
    { id: 'tags', label: 'Tags' },
    { id: 'more', label: 'More' },
  ];

  const icons = {
    notes: 'M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 5h6m-6 4h6',
    search: 'm20 20-4.2-4.2M16 10.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z',
    tags: 'M4 12V5a1 1 0 0 1 1-1h7l8 8-8 8-8-8zm4-5.5h.01',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
  };

  const sorts = ['Recent', 'Title', 'Folder'];
</script>

<section id="mobile" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Mobile parts</h2>
  <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
    Five components for a phone app: a top bar, a tab bar, a bottom sheet, a touch row and a floating action. They pad
    themselves with the safe-area insets, keep every target at 44px and use the same tokens as the rest of the kit.
  </p>

  <div class="mt-6 grid gap-8 md:grid-cols-2">
    <div class="flex flex-col items-center gap-4">
      <SegmentedControl
        label="Platform"
        size="sm"
        bind:value={phone}
        options={[
          { value: 'iphone', label: 'iPhone' },
          { value: 'android', label: 'Android' },
        ]}
      />
      <div
        data-profile={phone}
        class="relative flex h-[34rem] w-[19rem] max-w-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-line-strong bg-canvas shadow-lift"
        data-testid="phone-frame"
      >
        <TopBar
          sticky={false}
          title={tab === 'notes' ? 'Notes' : tab === 'search' ? 'Search' : tab === 'tags' ? 'Tags' : 'More'}
          subtitle="5 notes"
          back={tab !== 'notes'}
          on:back={() => {
            tab = 'notes';
          }}
        >
          <svelte:fragment slot="actions">
            <Button variant="quiet" size="sm" on:click={() => (sheetOpen = true)}>{sort}</Button>
          </svelte:fragment>
        </TopBar>

        <div class="min-h-0 flex-1 overflow-y-auto">
          <div class="divide-y divide-line">
            <ListRow title="Meeting notes" description="Work, yesterday" navigates />
            <ListRow title="Reading list" description="Personal, 3 days ago" value="12" navigates />
            <ListRow title="Trip to Almaty" description="Travel, last week" navigates />
            <ListRow title="Recipes" description="Home, last month" navigates />
            <ListRow title="Empty the trash" danger />
          </div>
        </div>

        <Fab fixed={false} lift label="New" />

        <BottomNav fixed={false} items={tabs} bind:value={tab} label="Phone demo">
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
    </div>

    <div class="min-w-0 space-y-6">
      <div>
        <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">BottomSheet</p>
        <Button variant="secondary" on:click={() => (sheetOpen = true)}>Sort by: {sort}</Button>
        <p class="mt-3 text-xs leading-relaxed text-ink-faint">
          Tap the backdrop, press Escape or drag the handle down to close it.
        </p>
      </div>
      <div>
        <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">ListRow</p>
        <div class="divide-y divide-line border-y border-line">
          <ListRow title="Theme" value="Gruvbox" href="#mobile" navigates />
          <ListRow title="Text size" description="Follows the system" navigates />
          <ListRow title="Sign out" danger />
          <ListRow title="Locked" disabled />
        </div>
      </div>
    </div>
  </div>
</section>

<BottomSheet bind:open={sheetOpen} title="Sort notes" description="The board keeps the order you pick.">
  <div class="-mx-5 divide-y divide-line border-y border-line">
    {#each sorts as option}
      <ListRow
        title={option}
        on:click={() => {
          sort = option;
          sheetOpen = false;
        }}
      >
        <svelte:fragment slot="trailing">
          {#if sort === option}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline
                points="20 6 9 17 4 12"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        </svelte:fragment>
      </ListRow>
    {/each}
  </div>
</BottomSheet>
