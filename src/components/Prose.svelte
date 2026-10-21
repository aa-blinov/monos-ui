<script>
  /**
   * A reading column for Markdown or article content. The component owns the
   * rhythm between elements; the product owns the words.
   */
  let className = '';
  export { className as class };
</script>

<div class="ui-prose {className}">
  <slot />
</div>

<style>
  :global(.ui-prose) {
    min-width: 0;
    max-width: 70ch;
    color: var(--ui-ink);
    font-size: 0.875rem;
    line-height: 1.7;
  }
  :global(.ui-prose > * + *) {
    margin-top: 0.75rem;
  }
  :global(.ui-prose h1),
  :global(.ui-prose h2),
  :global(.ui-prose h3),
  :global(.ui-prose h4) {
    color: var(--ui-ink);
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.3;
  }
  :global(.ui-prose h1) {
    font-size: 1.5rem;
    margin-top: 1.75rem;
  }
  :global(.ui-prose h2) {
    font-size: 1.125rem;
    margin-top: 1.5rem;
  }
  :global(.ui-prose h3) {
    font-size: 1rem;
    margin-top: 1.25rem;
  }
  :global(.ui-prose > :first-child) {
    margin-top: 0;
  }
  :global(.ui-prose p),
  :global(.ui-prose ul),
  :global(.ui-prose ol),
  :global(.ui-prose blockquote),
  :global(.ui-prose pre),
  :global(.ui-prose table) {
    margin-top: 0.75rem;
  }
  :global(.ui-prose ul),
  :global(.ui-prose ol) {
    padding-left: 1.25rem;
  }
  :global(.ui-prose ul) {
    list-style: disc;
  }
  :global(.ui-prose ol) {
    list-style: decimal;
  }
  :global(.ui-prose li + li) {
    margin-top: 0.25rem;
  }
  :global(.ui-prose a) {
    color: var(--ui-ink);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-color: var(--ui-line-strong);
  }
  :global(.ui-prose a:hover) {
    text-decoration-color: var(--ui-ink);
  }
  :global(.ui-prose strong) {
    font-weight: 700;
    color: var(--ui-ink);
  }
  :global(.ui-prose code) {
    border: 1px solid var(--ui-line);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    padding: 0.1rem 0.3rem;
    font-family: inherit;
    font-size: 0.9em;
  }
  :global(.ui-prose pre) {
    overflow-x: auto;
    border: 1px solid var(--ui-line);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    padding: 0.75rem 1rem;
    line-height: 1.6;
  }
  :global(.ui-prose pre code) {
    border: 0;
    background: transparent;
    padding: 0;
    font-size: 0.8rem;
  }
  :global(.ui-prose blockquote) {
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    padding: 0.75rem 1rem;
    color: var(--ui-ink-soft);
  }
  :global(.ui-prose hr) {
    border: 0;
    border-top: 1px solid var(--ui-line);
    margin: 1.5rem 0;
  }
  :global(.ui-prose table) {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
  }
  :global(.ui-prose th) {
    border-bottom: 1px solid var(--ui-line-strong);
    padding: 0.4rem 0.5rem;
    text-align: left;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ui-ink-faint);
  }
  :global(.ui-prose td) {
    border-bottom: 1px solid var(--ui-line);
    padding: 0.4rem 0.5rem;
    color: var(--ui-ink-soft);
  }
  :global(.ui-prose img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--ui-radius);
  }
</style>
