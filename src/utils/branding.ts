/**
 * Utility functions for dynamically updating browser tab title and favicon
 */

export const DEFAULT_TAB_TITLE = 'Azim PJ — Neobrutalist Portfolio';

// Clean, high-contrast SVG favicon (Neobrutalist geometric blocks)
export const DEFAULT_FAVICON_SVG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#0A0A0A" />
    <rect x="8" y="8" width="24" height="24" fill="#EFFF00" />
    <rect x="32" y="32" width="24" height="24" fill="#304FFE" />
    <rect x="32" y="8" width="8" height="8" fill="#F4F0E6" />
    <rect x="24" y="48" width="8" height="8" fill="#F4F0E6" />
  </svg>`
)}`;

export interface FaviconPreset {
  id: string;
  name: string;
  label: string;
  dataUrl: string;
}

export const PRESET_FAVICONS: FaviconPreset[] = [
  {
    id: 'neobrutal-block',
    name: 'Dual Block',
    label: 'Acid Yellow + Hyper Blue',
    dataUrl: DEFAULT_FAVICON_SVG,
  },
  {
    id: 'acid-flash',
    name: 'Acid Flash',
    label: 'Bold Minimalist Lightning',
    dataUrl: `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#0A0A0A" />
        <path d="M36 6 L14 36 L30 36 L26 58 L50 28 L34 28 Z" fill="#EFFF00" stroke="#0A0A0A" stroke-width="2" />
      </svg>`
    )}`,
  },
  {
    id: 'monolith-blue',
    name: 'Hyper Monolith',
    label: 'Geometric Cobalt Blue',
    dataUrl: `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#304FFE" />
        <rect x="12" y="12" width="40" height="40" fill="#0A0A0A" />
        <rect x="20" y="20" width="24" height="24" fill="#EFFF00" />
      </svg>`
    )}`,
  },
  {
    id: 'geometric-spark',
    name: 'Stark Star',
    label: 'Brutalist Four-Point Star',
    dataUrl: `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#F4F0E6" />
        <path d="M32 6 Q32 32 6 32 Q32 32 32 58 Q32 32 58 32 Q32 32 32 6 Z" fill="#0A0A0A" />
        <circle cx="32" cy="32" r="5" fill="#EFFF00" />
      </svg>`
    )}`,
  },
  {
    id: 'terminal-prompt',
    name: 'Terminal CLI',
    label: 'Code / Command Symbol',
    dataUrl: `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#0A0A0A" />
        <path d="M14 18 L28 32 L14 46" stroke="#EFFF00" stroke-width="8" stroke-linecap="square" fill="none" />
        <line x1="34" y1="46" x2="50" y2="46" stroke="#304FFE" stroke-width="8" stroke-linecap="square" />
      </svg>`
    )}`,
  },
];

export const PRESET_TAB_TITLES = [
  'Azim PJ — Neobrutalist Portfolio',
  'Azim PJ | Creative Director & Strategist',
  'Azim PJ — Selected Works & Systems [2026]',
  'AZIM PJ // PORTFOLIO ARCHIVE',
  'Azim PJ — Brand Strategist & Product Lead',
];

/**
 * Update document title dynamically
 */
export function updateTabTitle(title: string) {
  if (typeof document !== 'undefined') {
    document.title = title || DEFAULT_TAB_TITLE;
  }
}

/**
 * Update browser favicon dynamically
 */
export function updateFavicon(faviconUrl: string) {
  if (typeof document === 'undefined') return;

  const url = faviconUrl || DEFAULT_FAVICON_SVG;

  // Find or create link element for favicon
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  // Set appropriate type
  if (url.startsWith('data:image/svg+xml') || url.endsWith('.svg')) {
    link.type = 'image/svg+xml';
  } else if (url.startsWith('data:image/png') || url.endsWith('.png')) {
    link.type = 'image/png';
  } else {
    link.type = 'image/x-icon';
  }

  link.href = url;
}
