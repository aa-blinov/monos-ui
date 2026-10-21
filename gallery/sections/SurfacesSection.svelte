<script>
  import { Card } from '../../src/index.js';
</script>

<section id="surfaces" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Surfaces</h2>
  <div class="mt-4 grid gap-4 sm:grid-cols-2">
    <Card>
      <p class="text-sm font-bold">A quiet card</p>
      <p class="mt-1 text-xs leading-relaxed text-ink-soft">
        Flat at rest, one radius, a hairline border. The surface is a tonal step, not a shadow.
      </p>
    </Card>
    <Card interactive>
      <p class="text-sm font-bold">An interactive card</p>
      <p class="mt-1 text-xs leading-relaxed text-ink-soft">
        Hover lifts it by half a pixel and deepens the border. Under reduce motion it stays put.
      </p>
    </Card>
  </div>
</section>
