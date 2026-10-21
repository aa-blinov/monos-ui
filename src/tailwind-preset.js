/**
 * The Tailwind bridge. It names the semantic tokens; a component writes
 * `bg-surface text-ink border-line` and never `bg-[var(--ui-surface)]`.
 *
 * Use:
 *   import preset from '@monos/ui/tailwind-preset';
 *   export default {
 *     presets: [preset],
 *     content: [ ...your source, and the kit's src directory... ],
 *   };
 *
 * Colour tokens are plain values (`var(--ui-…)`), so Tailwind's `/opacity`
 * modifier is not available on them; use `color-mix()` for a translucent
 * surface, exactly as the kit's own components do.
 */
export default {
  theme: {
    extend: {
      colors: {
        canvas: 'var(--ui-bg)',
        surface: 'var(--ui-surface)',
        'surface-2': 'var(--ui-surface-2)',
        ink: {
          DEFAULT: 'var(--ui-ink)',
          soft: 'var(--ui-ink-soft)',
          faint: 'var(--ui-ink-faint)',
          muted: 'var(--ui-ink-muted)',
        },
        line: {
          DEFAULT: 'var(--ui-line)',
          strong: 'var(--ui-line-strong)',
        },
        accent: 'var(--ui-accent)',
        danger: 'var(--ui-danger)',
        warning: 'var(--ui-warning)',
        success: 'var(--ui-success)',
        info: 'var(--ui-info)',
      },
      borderRadius: {
        ui: 'var(--ui-radius)',
      },
      fontFamily: {
        ui: 'var(--ui-font)',
      },
      fontSize: {
        whisper: ['var(--ui-text-whisper)', { lineHeight: '1.45' }],
        'whisper-lg': ['var(--ui-text-whisper-lg)', { lineHeight: '1.45' }],
      },
      spacing: {
        hair: 'var(--ui-space-hair)',
        tight: 'var(--ui-space-tight)',
        field: 'var(--ui-space-field)',
        snug: 'var(--ui-space-snug)',
        input: 'var(--ui-space-input)',
        base: 'var(--ui-space-base)',
        comfortable: 'var(--ui-space-comfortable)',
        roomy: 'var(--ui-space-roomy)',
        section: 'var(--ui-space-section)',
      },
      boxShadow: {
        rest: 'var(--ui-shadow-rest)',
        lift: 'var(--ui-shadow-lift)',
        overlay: 'var(--ui-shadow-overlay)',
      },
      transitionDuration: {
        fast: 'var(--ui-duration-fast)',
        base: 'var(--ui-duration-base)',
      },
      zIndex: {
        menu: 'var(--ui-z-menu)',
        modal: 'var(--ui-z-modal)',
        tooltip: 'var(--ui-z-tooltip)',
      },
    },
  },
};
