<script>
  import { Paperclip } from 'lucide-svelte';
  import { Button, Card, EmptyState } from '../../src/index.js';
</script>

<section id="empty" class="mt-12 scroll-mt-20">
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
</section>
