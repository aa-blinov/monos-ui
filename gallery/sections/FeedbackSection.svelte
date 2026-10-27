<script>
  import { Button, Progress, Skeleton, Spinner, toast } from '../../src/index.js';

  const progress = 62;
</script>

<section id="feedback" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Feedback and loading</h2>
  <div class="mt-4 grid gap-8 md:grid-cols-2">
    <div class="space-y-5">
      <div>
        <p class="mb-1.5 text-xs text-ink-soft">Upload, {progress}%</p>
        <Progress value={progress} label="Upload progress" />
      </div>
      <div>
        <p class="mb-1.5 text-xs text-ink-soft">Loading</p>
        <Progress indeterminate label="Loading" />
      </div>
      <div class="flex items-center gap-3">
        <Spinner size="lg" label="Loading" />
        <span class="text-xs text-ink-soft">A spinner, when the wait has no length</span>
      </div>
      <div class="flex flex-wrap gap-3">
        <Button
          size="sm"
          on:click={() => toast({ title: 'Note saved', description: 'The file is on disk.', tone: 'success' })}
          >Show a toast</Button
        >
        <Button
          size="sm"
          variant="secondary"
          on:click={() =>
            toast({
              title: 'Sync waits',
              description: 'Review the agent changes before this device sends.',
              tone: 'warning',
              duration: 0,
              action: { label: 'Review', onClick: () => {} },
            })}>Toast with an action</Button
        >
      </div>
    </div>
    <div class="space-y-2" aria-hidden="true">
      <Skeleton width="45%" height="1rem" />
      <Skeleton width="100%" height="0.75rem" />
      <Skeleton width="92%" height="0.75rem" />
      <Skeleton width="70%" height="0.75rem" />
    </div>
  </div>
</section>
