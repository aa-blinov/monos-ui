<script>
  import { LayoutGrid, Map, Settings, Star, Trash2 } from 'lucide-svelte';
  import { AlertDialog, Button, Menu, Modal, Popover, toast } from '../../src/index.js';

  let modalOpen = false;
  let picked = '';
  let popoverOpen = false;
  let alertOpen = false;

  const menuItems = [
    { value: 'map', label: 'Map', icon: Map },
    { value: 'favorites', label: 'Favorites', icon: Star },
    { value: 'settings', label: 'Settings', icon: Settings },
    { separator: true },
    { value: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];
</script>

<section id="overlays" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Overlays</h2>
  <p class="mt-1 text-xs text-ink-soft">
    A menu, a modal, a popover and a destructive confirmation share the same surface and z-layers.
  </p>
  <div class="mt-4 flex flex-wrap items-center gap-4">
    <Menu items={menuItems} label="Actions" on:select={(event) => (picked = event.detail.label)}>
      <svelte:fragment slot="trigger" let:open let:toggle let:triggerProps>
        <Button variant="secondary" on:click={toggle} {...triggerProps}>
          <svelte:fragment slot="icon">
            <LayoutGrid class="h-4 w-4" strokeWidth="1.7" />
          </svelte:fragment>
          {open ? 'Close menu' : 'Open menu'}
        </Button>
      </svelte:fragment>
    </Menu>
    <Button variant="secondary" on:click={() => (modalOpen = true)}>Open a modal</Button>
    <Popover label="Filters" bind:open={popoverOpen}>
      <svelte:fragment slot="trigger" let:toggle let:triggerProps>
        <Button variant="secondary" on:click={toggle} {...triggerProps}>Filters</Button>
      </svelte:fragment>
      <p class="text-sm font-bold">Filter the board</p>
      <p class="mt-1 text-xs leading-relaxed text-ink-soft">
        Any content can live here: a small form, a date, a set of toggles.
      </p>
    </Popover>
    <Button variant="danger" on:click={() => (alertOpen = true)}>Delete a note</Button>
    {#if picked}
      <span class="text-xs text-ink-faint">Picked: {picked}</span>
    {/if}
  </div>
  <AlertDialog
    bind:open={alertOpen}
    title="Delete this note?"
    description="This cannot be undone."
    confirmLabel="Delete"
    on:confirm={() => toast({ title: 'Deleted', description: 'The note is in the trash.', tone: 'success' })}
  />
  <Modal bind:open={modalOpen} title="Delete this note?" description="This cannot be undone.">
    <p class="text-sm leading-relaxed text-ink-soft">
      The note and its pictures will leave this folder. The history in git keeps a copy until it is pruned.
    </p>
    <svelte:fragment slot="footer">
      <Button variant="secondary" on:click={() => (modalOpen = false)}>Cancel</Button>
      <Button variant="danger" on:click={() => (modalOpen = false)}>Delete</Button>
    </svelte:fragment>
  </Modal>
</section>
