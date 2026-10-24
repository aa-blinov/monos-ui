<script>
  import { DeviceFrame, SegmentedControl, profileNames, profiles } from '../../src/index.js';
  import ProfileDemo from '../ProfileDemo.svelte';

  let profile = 'mobile';

  $: spec = profiles[profile];
  const options = profileNames.map((id) => ({ value: id, label: profiles[id].name }));
</script>

<section id="profiles" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Device profiles</h2>
  <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
    Five profiles: desktop, laptop, tablet, mobile and watch. Put <code class="font-mono text-xs">data-profile</code> on
    an app root and the bars, rows and touch targets take that device's size;
    <code class="font-mono text-xs">DeviceFrame</code> shows a layout at the real screen size, scaled to fit.
  </p>

  <div class="mt-5 overflow-x-auto">
    <SegmentedControl label="Profile" bind:value={profile} {options} />
  </div>

  <div class="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
    <div class="min-w-0">
      <DeviceFrame {profile}>
        <ProfileDemo {profile} />
      </DeviceFrame>
    </div>
    <dl class="space-y-4 text-sm lg:pt-2">
      <div>
        <dt class="text-whisper uppercase tracking-widest text-ink-faint">Screen</dt>
        <dd class="mt-1">{spec.width} x {spec.height} px</dd>
      </div>
      <div>
        <dt class="text-whisper uppercase tracking-widest text-ink-faint">Input</dt>
        <dd class="mt-1">{spec.input}</dd>
      </div>
      <div>
        <dt class="text-whisper uppercase tracking-widest text-ink-faint">Bar height</dt>
        <dd class="mt-1">{spec.bar}</dd>
      </div>
      <div>
        <dt class="text-whisper uppercase tracking-widest text-ink-faint">Touch target</dt>
        <dd class="mt-1">{spec.touch}</dd>
      </div>
      <div>
        <dt class="text-whisper uppercase tracking-widest text-ink-faint">Safe area</dt>
        <dd class="mt-1">top {spec.safe.top}, bottom {spec.safe.bottom}</dd>
      </div>
      <pre class="overflow-x-auto rounded-ui border border-line bg-surface p-3 font-mono text-xs"><code
          >&lt;div data-profile="{profile}"&gt;
  ...
&lt;/div&gt;</code
        ></pre>
    </dl>
  </div>
</section>
