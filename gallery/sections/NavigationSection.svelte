<script>
  import { Breadcrumbs, Button, Drawer, NavItem, PageHeader, Pagination, Prose, Stepper } from '../../src/index.js';

  let page = 4;
  let drawerOpen = false;
  let step = 'details';
  let navItem = 'overview';

  const stepItems = [
    { id: 'details', label: 'Details', description: 'Name and folder' },
    { id: 'content', label: 'Content', description: 'Write the note' },
    { id: 'review', label: 'Review', description: 'Check and save' },
  ];
</script>

<section id="navigation" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Navigation and content</h2>
  <div class="mt-4 space-y-8">
    <PageHeader
      title="A page header"
      description="It names the page, says what it is for and holds the actions."
      level={2}
    >
      <svelte:fragment slot="actions">
        <Button variant="secondary" size="sm">Share</Button>
      </svelte:fragment>
    </PageHeader>

    <div class="grid gap-8 md:grid-cols-2">
      <div class="min-w-0 space-y-8">
        <div>
          <Breadcrumbs items={[{ label: 'Notes', href: '#' }, { label: 'Work', href: '#' }, { label: 'Today' }]} />
        </div>
        <div>
          <Pagination bind:page pages={12} />
        </div>
        <div>
          <Button variant="secondary" on:click={() => (drawerOpen = true)}>Open a drawer</Button>
          <Drawer bind:open={drawerOpen} title="Filters" description="Narrow the board without leaving it.">
            <p class="text-sm leading-relaxed text-ink-soft">
              The drawer holds a longer filter form on a phone, or navigation when the sidebar is gone.
            </p>
            <svelte:fragment slot="footer">
              <Button variant="secondary" on:click={() => (drawerOpen = false)}>Cancel</Button>
              <Button on:click={() => (drawerOpen = false)}>Apply</Button>
            </svelte:fragment>
          </Drawer>
        </div>
      </div>

      <Prose class="min-w-0">
        <h3>Reading a note</h3>
        <p>
          A reading column is a measure, a rhythm and a quiet place for links. The prose wrapper owns the space between
          the elements; the product owns the words.
        </p>
        <ul>
          <li>Headings take the same face and weight as the rest of the kit.</li>
          <li>Code sits on one surface, with one radius.</li>
        </ul>
        <blockquote>One radius, one face, one accent at a time.</blockquote>
        <pre><code>npm install github:aa-blinov/monos-ui</code></pre>
      </Prose>
    </div>
    <div class="grid gap-8 md:grid-cols-2">
      <div>
        <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">Stepper</p>
        <Stepper steps={stepItems} bind:value={step} clickable label="Note setup" />
      </div>
      <div>
        <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">Nav item</p>
        <div class="max-w-xs rounded-ui border border-line p-1">
          <NavItem active={navItem === 'overview'} label="Overview" on:click={() => (navItem = 'overview')} />
          <NavItem active={navItem === 'members'} label="Members" on:click={() => (navItem = 'members')} />
          <NavItem active={navItem === 'settings'} label="Settings" on:click={() => (navItem = 'settings')} />
        </div>
      </div>
    </div>
  </div>
</section>
