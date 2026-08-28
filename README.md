# Sellsfie (Astro)

A port of [sellsfie.com](https://sellsfie.com) from Next.js (App Router) to **Astro**, then
refined for accessibility, performance and visual consistency. Ships effectively zero
client-side framework code.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Routes

| Route | Description |
| --- | --- |
| `/` · `/bn/` | Landing page: hero, integrations marquee, feature bento, six-workspace tabs, P&L and audit split, testimonial, pricing |
| `/demo` · `/bn/demo` | WhatsApp demo booking |
| `/templates/landing-pages` · `/bn/…` | Template catalogue, fetched at build time |
| `/templates/website-template` · `/bn/…` | "Coming soon" placeholder |

## Architecture

**Static output.** No adapter, no SSR. Everything renders at build time.

**Interactivity is vanilla JS in `.astro` `<script>` blocks**, with no React and no
hydration directives. The theme switch, language dropdown, mobile menu, scroll-spy nav,
workspace tabs, screenshot lightbox, dispatch demo, pricing toggle and template pagination
are each a small island scoped to their own component.

**i18n** uses Astro's built-in routing: English at the root, Bangla under `/bn/`. The
463-key dictionary in `src/i18n/{en,bn}.json` was recovered from the original build.
`useTranslations(lang)` returns `t()` for strings and `tList()` for arrays, falling back to
English for any key a locale is missing.

**Styling** is Tailwind **v3**, pinned deliberately: v4's oklch palette and 1px default
`ring` width would shift the design. Custom classes (`.bento`, `.btn-brand`, `.glass`,
`.grid-bg`, `.eyebrow`, `.polaroid`, `.lift`) and the light-theme override block live in
`src/styles/global.css`.

## Fidelity

The port was verified against the live site in a real browser. Heading typography matches
exactly: same letter-spacing, same pixel widths, same line breaks. Two details that are
easy to miss were carried over deliberately: `.font-display` ships an extra
`letter-spacing: -0.02em` alongside its family rule, and the light theme is a separate
override block rather than a token swap.

## Changes from the original

**Fixed**

- The hero sales chart rendered empty on the original. Its bars used percentage heights
  inside content-sized flex columns, so every column collapsed to 0px. Columns now have a
  definite height, and gross/net render as one stacked bar instead of two siblings whose
  percentages summed past 100%.
- The two floating hero cards sat directly on top of that chart. Orders and stock now sit
  inside the dashboard mock, so nothing overlaps.

**Accessibility** (Lighthouse 96 to 100)

- `slate-500` and `slate-600` failed WCAG AA on the dark background (4.22:1 and 2.65:1).
  Remapped in the Tailwind config to 5.05:1 and 4.60:1 on the same hue, which fixes every
  usage without touching markup.
- Light theme had 14 contrast failures, worst of all brand green at 1.95:1. Foreground
  greens and reds are darkened in light mode only; backgrounds and buttons keep the bright
  green.
- Added a skip link, one consistent `:focus-visible` ring, and `prefers-reduced-motion`
  support (the page runs about 26 simultaneous animations by default).
- The workspace tabs now implement the full ARIA tabs keyboard model: arrow keys, Home and
  End, with a roving tabindex.
- Fixed an accessible-name mismatch on the language button.

**Performance**

- Screenshots were 1920px PNGs (2.6 MB total) rendered into a 400px slot. They now run
  through Astro's image pipeline as sized webp; the visible one dropped from 660 KB to
  about 9 KB.
- Bengali webfonts (about 180 KB) were downloading on English pages purely for the two
  Bengali characters in the language switcher. They are now loaded only on `/bn` routes,
  where English pages fall back to a system Bengali face.
- The logo was two stacked images with one permanently hidden, so both downloaded. It is
  now one image whose source the theme script swaps.
- English homepage went from 325 KB to 189 KB.

**Content and UX**

- `hero.ctaDemo` was already translated in both locales but never rendered. It is now a
  secondary hero CTA.
- Footer links all pointed at `#`. Ones with a real destination now go there; the rest
  render as plain text rather than pretending to be links.
- Section eyebrows used three different tracking values for the same role. Unified into
  `.eyebrow` / `.eyebrow-sm`.
- Five pulsing dots in the warehouse list were decorative bullets, not live indicators.
  They are static now; the pulse is reserved for genuine "live" badges.
- No em dashes in any user-facing copy. Negative values in the P&L table use a real minus
  sign (U+2212), which is what that column always meant.

**Also added**

- Templates fetch at build time rather than in the browser, so the catalogue is in the HTML
  and indexable. `src/lib/templates.ts` degrades to an empty list if the API is
  unreachable, so a build never fails on it.
- All six workspace tab panels render server-side; JS only toggles visibility.
- `hreflang` and canonical tags for both locales, plus a sitemap.

## Known gaps

- The `/demo` page copy is English-only in the original, so it has no Bangla translation.
  Its keys live under `demo.*` in `en.json`; add a `demo` block to `bn.json` to translate
  it. The fallback keeps it readable meanwhile.
- Footer links without a destination (`Changelog`, `About`, `Careers`) are inert by design.
- `#compare` in the pricing footnote has no target on the original site either.

## Assets

`src/assets/` holds the two logos and five product screenshots pulled from the original;
Astro's image pipeline emits sized webp from them. Bengali font files live in
`public/fonts/` so they can be loaded conditionally. Template preview images are hotlinked
from `static.sellsfie.com`, as on the original.
