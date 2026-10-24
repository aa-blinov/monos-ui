<script>
  /**
   * A device around a screen, for previewing a layout at the size of a phone, a
   * tablet, a laptop, a desktop window or a watch. The screen has the exact
   * CSS-pixel size of the profile and carries `data-profile`, so the kit's bars
   * and rows inside take that device's density; the whole frame scales down to
   * fit the width it is given. Fixed-position parts (a `Fab`, a `BottomNav`)
   * should use `fixed={false}` inside, so they stay on the screen.
   */
  import { profiles } from '../profiles.js';

  export let profile = 'mobile';
  export let label = '';
  // A phone is taller than a screen; the frame also shrinks to this height.
  export let maxHeight = 620;

  let className = '';
  export { className as class };

  let available = 0;

  $: spec = profiles[profile] || profiles.mobile;
  $: chrome = spec.shape === 'browser' ? 30 : 0;
  $: base = spec.shape === 'laptop' ? 16 : 0;
  $: outerWidth = spec.width + spec.bezel * 2;
  $: outerHeight = spec.height + spec.bezel * 2 + chrome + base;
  $: scale = available
    ? Math.min(1, available / (outerWidth + (spec.shape === 'watch' ? 10 : 0)), maxHeight / outerHeight)
    : 1;
  $: inner = Math.max(6, spec.radius - spec.bezel);
</script>

<div bind:clientWidth={available} class="w-full {className}" role="group" aria-label={label || spec.name}>
  <div class="mx-auto" style="width: {outerWidth * scale}px; height: {outerHeight * scale}px;">
    <div
      class="relative"
      style="width: {outerWidth}px; height: {outerHeight}px; transform: scale({scale}); transform-origin: top left;"
    >
      <div
        class="absolute left-0 top-0 border-2 border-line-strong bg-surface shadow-lift"
        style="width: {outerWidth}px; height: {spec.height +
          spec.bezel * 2 +
          chrome}px; border-radius: {spec.radius}px; padding: {spec.bezel}px;"
      >
        {#if chrome}
          <div class="absolute inset-x-0 top-0 flex items-center gap-1.5 px-4" style="height: {spec.bezel + chrome}px;">
            <span class="h-2.5 w-2.5 rounded-full bg-line-strong"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-line-strong"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-line-strong"></span>
          </div>
        {/if}
        <div
          class="relative overflow-hidden bg-canvas text-ink"
          data-profile={spec.id}
          data-testid="device-screen"
          style="width: {spec.width}px; height: {spec.height}px; margin-top: {chrome}px; border-radius: {inner}px; --ui-safe-top: {spec
            .safe.top}; --ui-safe-bottom: {spec.safe.bottom};"
        >
          <slot />
        </div>
        {#if spec.shape === 'phone'}
          <span
            class="absolute left-1/2 -translate-x-1/2 rounded-full bg-ink"
            style="top: {spec.bezel + 8}px; width: 96px; height: 24px;"
            aria-hidden="true"
          ></span>
        {/if}
      </div>
      {#if spec.shape === 'laptop'}
        <div
          class="absolute bottom-0 rounded-b-[1.25rem] border-2 border-t-0 border-line-strong bg-surface-2"
          style="left: -{spec.bezel * 1.5}px; right: -{spec.bezel * 1.5}px; height: {base}px;"
          aria-hidden="true"
        ></div>
      {/if}
      {#if spec.shape === 'watch'}
        <span
          class="absolute rounded-r-md border-2 border-l-0 border-line-strong bg-surface-2"
          style="right: -9px; top: {outerHeight * 0.32}px; width: 9px; height: 44px;"
          aria-hidden="true"
        ></span>
      {/if}
    </div>
  </div>
</div>
