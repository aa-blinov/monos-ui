/**
 * A tooltip for one element. The kit keeps one look: a small capital tag for a
 * short label, ordinary wrapping text for a sentence, 450 ms under the pointer,
 * immediate on keyboard focus, never on a phone (there is no hover there).
 *
 * The tooltip is appended to the body, so an ancestor with `overflow: hidden`
 * cannot cut it off. Use it as an action:
 *
 *   <button use:tooltip={'Delete'}>…</button>
 *   <button use:tooltip={{ text: 'Deletes the note for good', placement: 'top' }}>…</button>
 *
 * The element keeps its accessible name through `aria-label`; the tooltip is a
 * visual hint, not the label.
 */
export const HOVER_DELAY = 450;
const GAP = 8;
const MARGIN = 12;

const BASE = 'pointer-events-none fixed z-tooltip max-w-xs rounded-ui border border-line bg-canvas px-3 py-2 text-ink shadow-overlay';
const SHORT = 'whitespace-nowrap text-whisper font-bold uppercase tracking-[0.14em]';
const LONG = 'whitespace-normal text-xs font-normal normal-case tracking-normal leading-relaxed';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function textOf(value) {
  if (typeof value === 'string') return { text: value, placement: 'bottom', align: 'center' };
  return {
    text: value?.text || '',
    placement: value?.placement || 'bottom',
    align: value?.align || 'center',
  };
}

export function tooltip(node, value) {
  let options = textOf(value);
  let element = null;
  let timer = null;
  let visible = false;

  function place() {
    if (!element) return;
    const anchor = node.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    const maxLeft = Math.max(MARGIN, window.innerWidth - box.width - MARGIN);
    const maxTop = Math.max(MARGIN, window.innerHeight - box.height - MARGIN);

    let left = anchor.left + anchor.width / 2 - box.width / 2;
    if (options.align === 'start') left = anchor.left;
    if (options.align === 'end') left = anchor.right - box.width;

    let top = options.placement === 'top' ? anchor.top - box.height - GAP : anchor.bottom + GAP;
    if (top + box.height > window.innerHeight - MARGIN) top = anchor.top - box.height - GAP;
    if (top < MARGIN) top = anchor.bottom + GAP;

    element.style.left = `${Math.round(clamp(left, MARGIN, maxLeft))}px`;
    element.style.top = `${Math.round(clamp(top, MARGIN, maxTop))}px`;
  }

  function show() {
    if (!options.text || window.innerWidth < 640) return;
    clearTimeout(timer);
    if (!element) {
      element = document.createElement('div');
      element.setAttribute('role', 'tooltip');
      element.className = `${BASE} ${options.text.length > 32 ? LONG : SHORT}`;
      element.textContent = options.text;
      document.body.appendChild(element);
    }
    visible = true;
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
  }

  function hide() {
    clearTimeout(timer);
    visible = false;
    window.removeEventListener('scroll', place, true);
    window.removeEventListener('resize', place);
    if (element) {
      element.remove();
      element = null;
    }
  }

  function onEnter() {
    clearTimeout(timer);
    timer = setTimeout(show, HOVER_DELAY);
  }

  function onLeave() {
    hide();
  }

  function onFocus() {
    show();
  }

  function onBlur() {
    hide();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') hide();
  }

  node.addEventListener('mouseenter', onEnter);
  node.addEventListener('mouseleave', onLeave);
  node.addEventListener('focus', onFocus);
  node.addEventListener('blur', onBlur);
  node.addEventListener('click', hide);
  node.addEventListener('keydown', onKeydown);
  node.setAttribute('data-ui-tooltip-anchor', '');

  return {
    update(next) {
      options = textOf(next);
      if (visible) hide();
    },
    destroy() {
      hide();
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
      node.removeEventListener('focus', onFocus);
      node.removeEventListener('blur', onBlur);
      node.removeEventListener('click', hide);
      node.removeEventListener('keydown', onKeydown);
      node.removeAttribute('data-ui-tooltip-anchor');
    },
  };
}
