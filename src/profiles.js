/**
 * The six device profiles of the kit. A profile is a screen size plus the
 * density that goes with it: how tall a bar is, how big a touch target is,
 * which parts of a bar are worth their room. `styles/profiles.css` carries the
 * tokens (set `data-profile` on any element), `DeviceFrame` draws the screen,
 * and a host picks a profile from its own breakpoint or platform.
 *
 * `width` and `height` are the CSS pixels of the screen, `safe` the insets a
 * notch, a home indicator or a rounded watch glass takes (rem).
 */
export const profiles = {
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    width: 1280,
    height: 800,
    input: 'pointer and keyboard',
    bar: '3rem',
    touch: '2.25rem',
    safe: { top: '0rem', bottom: '0rem' },
    shape: 'browser',
    bezel: 10,
    radius: 14,
  },
  laptop: {
    id: 'laptop',
    name: 'Laptop',
    width: 1024,
    height: 640,
    input: 'trackpad and keyboard',
    bar: '3rem',
    touch: '2.25rem',
    safe: { top: '0rem', bottom: '0rem' },
    shape: 'laptop',
    bezel: 14,
    radius: 18,
  },
  tablet: {
    id: 'tablet',
    name: 'Tablet',
    width: 768,
    height: 1024,
    input: 'touch, optional keyboard',
    bar: '3.5rem',
    touch: '2.75rem',
    safe: { top: '1.5rem', bottom: '1.25rem' },
    shape: 'tablet',
    bezel: 18,
    radius: 36,
  },
  iphone: {
    id: 'iphone',
    name: 'iPhone',
    width: 390,
    height: 844,
    input: 'touch, Dynamic Island, home indicator',
    bar: '2.75rem',
    touch: '2.75rem',
    safe: { top: '3.1875rem', bottom: '2.125rem' },
    shape: 'phone',
    bezel: 12,
    radius: 52,
  },
  android: {
    id: 'android',
    name: 'Android',
    width: 412,
    height: 892,
    input: 'touch, camera cut-out, gesture bar',
    bar: '3.5rem',
    touch: '3rem',
    safe: { top: '1.75rem', bottom: '1.5rem' },
    shape: 'android',
    bezel: 10,
    radius: 38,
  },
  watch: {
    id: 'watch',
    name: 'Watch',
    width: 198,
    height: 242,
    input: 'touch and crown',
    bar: '2.25rem',
    touch: '2.5rem',
    safe: { top: '0.5rem', bottom: '0.75rem' },
    shape: 'watch',
    bezel: 14,
    radius: 56,
  },
};

export const profileNames = Object.keys(profiles);
