/**
 * Line-icon set ported from the original build. Every glyph shares the same
 * 24x24 stroke geometry, so only the inner paths differ.
 */
export const iconPaths = {
  ArrowDown: `<path d="M12 5v14M19 12l-7 7-7-7"/>`,
  ArrowRight: `<path d="M5 12h14M13 5l7 7-7 7"/>`,
  ArrowUp: `<path d="M12 19V5M5 12l7-7 7 7"/>`,
  Bolt: `<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>`,
  Box: `<path d="M21 8 12 3 3 8m18 0-9 5m9-5v8l-9 5m0-8L3 8m9 5v8M3 8v8l9 5"/>`,
  Camera: `<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>`,
  Cart: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
  Chart: `<path d="M3 3v18h18M7 14l3-3 3 3 5-6"/>`,
  Check: `<path d="M20 6 9 17l-5-5"/>`,
  ChevronLeft: `<path d="m15 18-6-6 6-6"/>`,
  ChevronRight: `<path d="m9 18 6-6-6-6"/>`,
  Circle: `<circle cx="12" cy="12" r="9"/>`,
  Close: `<path d="M18 6 6 18M6 6l12 12"/>`,
  Code: `<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>`,
  Crosshair: `<circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/><circle cx="12" cy="12" r="4"/>`,
  Heart: `<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>`,
  Key: `<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8 3 3-3 3-2-2-2 2-2-2-2 2"/>`,
  Layer: `<path d="M12 3 2 8l10 5 10-5-10-5zM2 14l10 5 10-5M2 19l10 5 10-5"/>`,
  Menu: `<path d="M3 6h18M3 12h18M3 18h18"/>`,
  Quote: `<path d="M7 7h4v4H8c0 3 1 5 4 6v2c-5 0-7-3-7-7V7zM15 7h4v4h-3c0 3 1 5 4 6v2c-5 0-7-3-7-7V7z"/>`,
  Receipt: `<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM8 8h8M8 12h8M8 16h5"/>`,
  Search: `<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,
  Shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  Spark: `<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>`,
  Star: `<path d="m12 2 3 7 7 .5-5.5 4.5L18 22l-6-4-6 4 1.5-8L2 9.5 9 9z"/>`,
  Truck: `<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>`,
  Wallet: `<path d="M3 7a2 2 0 0 1 2-2h12v4M3 7v11a2 2 0 0 0 2 2h15v-6h-5a2 2 0 1 1 0-4h5V7"/>`,
  Warehouse: `<path d="M3 21V9l9-5 9 5v12M7 21v-7h10v7M9 14h6"/>`,
  ChevronDown: `<path d="m6 9 6 6 6-6"/>`,
  Globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,
  Moon: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
  Sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>`,
} as const;

export type IconName = keyof typeof iconPaths;
