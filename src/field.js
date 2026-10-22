/**
 * The geometry and look of a native field, shared by `FieldControl` and by a
 * host that keeps its own label and native element. The height is a step, not
 * derived from padding, so `<input>`, `<select>` and `<textarea>` share a
 * baseline. `underline` is the form-row look; `boxed` is a distinct object.
 */
const sizes = {
  sm: 'h-7 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-11 text-sm',
};

export function fieldControlClass({ variant = 'underline', size = 'md', extraClass = '' } = {}) {
  const shape =
    variant === 'boxed'
      ? 'rounded-ui border border-line bg-surface px-3 focus:border-ink-soft'
      : 'border-b border-line bg-transparent px-1 focus:border-ink-soft';
  return [
    'w-full text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint',
    'disabled:cursor-not-allowed disabled:opacity-50 max-sm:h-11',
    sizes[size] || sizes.md,
    'leading-6',
    shape,
    extraClass,
  ]
    .filter(Boolean)
    .join(' ');
}
