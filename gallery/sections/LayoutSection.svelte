<script>
  import { Chip, Container, Grid, Section, Separator, Stack } from '../../src/index.js';
</script>

<section id="layout" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Layout</h2>
  <p class="mt-1 text-xs text-ink-soft">
    A container, a stack, a grid, a section and a hairline. The page structure, without a second design language.
  </p>
  <div class="mt-4 space-y-6">
    <Container size="sm" padded={false}>
      <div class="rounded-ui border border-dashed border-line p-4 text-xs text-ink-faint">
        A narrow container (max-w-2xl), centred inside the page.
      </div>
    </Container>

    <div class="grid gap-4 md:grid-cols-2">
      <Stack gap="sm" class="rounded-ui border border-line p-3">
        <p class="text-whisper uppercase tracking-widest text-ink-faint">Stack, column</p>
        <Stack direction="row" gap="sm" wrap>
          <Chip>One</Chip>
          <Chip>Two</Chip>
          <Chip>Three</Chip>
        </Stack>
      </Stack>
      <Grid columns={3} gap="sm" class="rounded-ui border border-line p-3 max-sm:grid-cols-1">
        {#each [1, 2, 3] as number}
          <div class="rounded-ui bg-surface p-3 text-center text-xs text-ink-soft">{number}</div>
        {/each}
      </Grid>
    </div>

    <Section spacing="sm" class="rounded-ui border border-line px-3">
      <p class="text-xs text-ink-soft">Section with a small vertical rhythm.</p>
    </Section>

    <div class="space-y-2">
      <p class="text-xs text-ink-soft">Above</p>
      <Separator />
      <p class="text-xs text-ink-soft">Below</p>
    </div>

    <div class="flex items-center gap-4 text-xs text-ink-soft">
      <span>Left</span>
      <Separator orientation="vertical" class="h-6" />
      <span>Right</span>
    </div>
  </div>
</section>
