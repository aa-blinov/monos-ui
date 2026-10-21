import { writable } from 'svelte/store';

/**
 * A queue of transient messages. The store is intentionally small: a product
 * calls `toast()`, mounts one `<Toaster />`, and can dismiss or clear.
 *
 *   toast('Saved');
 *   toast({ title: 'Sync failed', description: 'The token cannot write.', tone: 'danger', duration: 0 });
 *
 * `duration: 0` keeps a message until it is dismissed. The store keeps the last
 * four; older ones are dropped and their timers cleared.
 */
export const toasts = writable([]);

let counter = 0;
const timers = new Map();

function clearTimer(id) {
  const timer = timers.get(id);
  if (timer) clearTimeout(timer);
  timers.delete(id);
}

function remove(id) {
  clearTimer(id);
  toasts.update((list) => list.filter((item) => item.id !== id));
}

/** Show a toast. Returns its id. */
export function toast(options) {
  const value = typeof options === 'string' ? { title: options } : { ...options };
  const id = value.id ?? `ui-toast-${++counter}`;
  const item = {
    id,
    title: value.title ?? '',
    description: value.description ?? '',
    tone: value.tone ?? 'neutral',
    action: value.action ?? null,
    duration: value.duration ?? 5000,
  };

  remove(id);
  toasts.update((list) => {
    const next = [...list, item];
    if (next.length > 4) {
      const dropped = next.shift();
      clearTimer(dropped.id);
    }
    return next;
  });

  if (item.duration > 0 && typeof window !== 'undefined') {
    timers.set(
      id,
      setTimeout(() => remove(id), item.duration),
    );
  }
  return id;
}

/** Dismiss one toast. */
export function dismissToast(id) {
  remove(id);
}

/** Dismiss every toast. */
export function clearToasts() {
  for (const id of [...timers.keys()]) clearTimer(id);
  toasts.set([]);
}
