<section id="start" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Quick start</h2>
  <p class="mt-1 max-w-2xl text-xs leading-relaxed text-ink-soft">
    Install, then three small edits. After them every part below works, in the theme and the face the page above is set
    to. Svelte 4 and Tailwind 3 are the peers.
  </p>
  <ol class="mt-4 grid gap-4 md:grid-cols-2">
    <li class="min-w-0">
      <p class="text-whisper font-bold uppercase tracking-widest text-ink-soft">1. Tailwind preset</p>
      <pre
        class="mt-2 overflow-x-auto rounded-ui border border-line bg-surface p-3 font-mono text-xs leading-relaxed text-ink-soft"><code
          >import ui from '@monos/ui/tailwind-preset';

export default &#123;
  presets: [ui],
  content: ['./src/**/*.&#123;svelte,js&#125;',
    './node_modules/@monos/ui/src/**/*.svelte'],
&#125;;</code
        ></pre>
    </li>
    <li class="min-w-0">
      <p class="text-whisper font-bold uppercase tracking-widest text-ink-soft">2. Styles</p>
      <pre
        class="mt-2 overflow-x-auto rounded-ui border border-line bg-surface p-3 font-mono text-xs leading-relaxed text-ink-soft"><code
          >import '@monos/ui/styles.css';</code
        ></pre>
      <p class="mt-2 text-xs leading-relaxed text-ink-soft">Tokens, six themes, and the typefaces, shipped locally.</p>
    </li>
    <li class="min-w-0">
      <p class="text-whisper font-bold uppercase tracking-widest text-ink-soft">3. Theme, mode and face</p>
      <pre
        class="mt-2 overflow-x-auto rounded-ui border border-line bg-surface p-3 font-mono text-xs leading-relaxed text-ink-soft"><code
          >&lt;html data-theme="gruvbox"
      data-mode="dark"
      data-font="sans"&gt;</code
        ></pre>
      <p class="mt-2 text-xs leading-relaxed text-ink-soft">The three selectors at the top of this page set these.</p>
    </li>
    <li class="min-w-0">
      <p class="text-whisper font-bold uppercase tracking-widest text-ink-soft">4. A screen</p>
      <pre
        class="mt-2 overflow-x-auto rounded-ui border border-line bg-surface p-3 font-mono text-xs leading-relaxed text-ink-soft"><code
          >import &#123; Button, Card &#125; from '@monos/ui';

&lt;Card&gt;
  &lt;Button&gt;New note&lt;/Button&gt;
&lt;/Card&gt;</code
        ></pre>
      <p class="mt-2 text-xs leading-relaxed text-ink-soft">
        Next: the tokens, then actions and inputs, then content and layout.
        <a
          href="https://github.com/aa-blinov/monos-ui/blob/main/docs/components.md"
          class="underline underline-offset-2 transition-colors duration-fast hover:text-ink">Every prop</a
        > is in the docs.
      </p>
    </li>
  </ol>
</section>
