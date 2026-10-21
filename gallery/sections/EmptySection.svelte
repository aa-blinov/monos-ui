<script>
  import { Heart, Paperclip } from 'lucide-svelte';
  import { Button, Card, EmptyState, IconButton, Kbd, Spinner, Tooltip } from '../../src/index.js';
</script>

<section id="empty" class="mt-12 scroll-mt-20 grid gap-6 md:grid-cols-2">
  <div>
    <h2 class="text-lg font-bold tracking-tight">Empty state</h2>
    <Card padding="lg" class="mt-4">
      <EmptyState title="Nothing here yet" description="Write the first note, or bring the ones you already have.">
        <svelte:fragment slot="icon">
          <Paperclip class="h-8 w-8" strokeWidth="1.7" />
        </svelte:fragment>
        <svelte:fragment slot="actions">
          <Button size="sm">New note</Button>
          <Button size="sm" variant="secondary">Import</Button>
        </svelte:fragment>
      </EmptyState>
    </Card>
  </div>
  <div>
    <h2 class="text-lg font-bold tracking-tight">Keys and loading</h2>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <span class="text-sm text-ink-soft">Open the palette with <Kbd>⌘</Kbd> <Kbd>K</Kbd></span>
      <Spinner size="lg" label="Loading" />
    </div>
    <div class="mt-6 flex flex-wrap items-center gap-3">
      <IconButton label="Heart" variant="outline">
        <Heart class="h-4 w-4" strokeWidth="1.7" />
      </IconButton>
      <Tooltip text="This is a hint on any element">
        <span class="rounded-ui border border-dashed border-line px-3 py-2 text-xs text-ink-soft">Hover me</span>
      </Tooltip>
    </div>
  </div>
</section>
