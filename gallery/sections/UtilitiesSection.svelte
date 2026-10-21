<script>
  import { Button, FocusTrap, Portal } from '../../src/index.js';

  let trapActive = false;
</script>

<section id="utilities" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Utilities</h2>
  <p class="mt-1 text-xs text-ink-soft">
    A portal that leaves the parent's overflow, and a focus trap for a custom overlay.
  </p>
  <div class="mt-4 grid gap-6 md:grid-cols-2">
    <div>
      <p class="text-whisper uppercase tracking-widest text-ink-faint">Portal</p>
      <div id="portal-destination" class="mt-2 min-h-16 rounded-ui border border-dashed border-line p-4"></div>
      <Portal target="#portal-destination">
        <span class="block text-xs leading-relaxed text-ink-soft"
          >This sentence was portaled into the box above, outside this layout flow.</span
        >
      </Portal>
    </div>
    <div>
      <p class="text-whisper uppercase tracking-widest text-ink-faint">Focus trap</p>
      <Button variant="secondary" size="sm" class="mt-2" on:click={() => (trapActive = !trapActive)}>
        {trapActive ? 'Release focus' : 'Trap focus'}
      </Button>
      <FocusTrap active={trapActive} class="mt-3 rounded-ui border border-line p-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm">First</Button>
          <Button size="sm" variant="secondary">Second</Button>
        </div>
      </FocusTrap>
    </div>
  </div>
</section>
