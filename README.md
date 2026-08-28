# Sellsfie — Astro

A port of [sellsfie.com](https://sellsfie.com) (Next.js App Router) to **Astro**, kept
visually identical to the original while shipping effectively zero client-side framework code.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## What's here

| Route | Description |
| --- | --- |
| `/` · `/bn/` | Landing page — hero, integrations marquee, feature bento, six-workspace tabs, P&L/audit split, testimonial, pricing |
| `/demo` · `/bn/demo` | WhatsApp demo booking |
| `/templates/landing-pages` · `/bn/…` | Template catalogue, fetched at build time |
| `/templates/website-template` · `/bn/…` | "Coming soon" placeholder |

## Architecture

**Static output.** No adapter, no SSR. Everything renders at build time.

**Interactivity is vanilla JS in `.astro` `<script>` blocks** — no React, no hydration
directives. The theme switch, language dropdown, mobile menu, scroll-spy nav, workspace
tabs, screenshot lightbox, "Send to Pathao" dispatch demo, pricing billing toggle, and
template pagination are each a small island scoped to their component.

**i18n** uses Astro's built-in routing: English at the root, Bangla under `/bn/`.
The 463-key dictionary in `src/i18n/{en,bn}.json` was recovered from the original
build. `useTranslations(lang)` returns `t()` for strings and `tList()` for arrays, and
falls back to English for any key a locale is missing.

**Styling** is Tailwind **v3** (pinned deliberately — v4's oklch palette and 1px default
`ring` width would shift the design). Custom classes (`.bento`, `.btn-brand`, `.glass`,
`.grid-bg`, `.text-grad-brand`, `.polaroid`, `.lift`, …) and the full light-theme override
block live in `src/styles/global.css`, ported 1:1 from the original compiled CSS.

## Deliberate differences from the original

These are improvements, not drift:

- **Templates are fetched at build time**, not in the browser. The original ships loading
  skeletons and calls `app.sellsfie.com/api` after hydration; here the catalogue is in the
  HTML, so it's indexable and paints immediately. `src/lib/templates.ts` degrades to an
  empty list if the API is unreachable, so a build never fails on it.
- **All six workspace tab panels render server-side** (the original renders only the active
  one), so every feature is in the HTML for search engines. JS just toggles visibility.
- **Template pagination is client-side over a fully pre-rendered list** — same pager UI,
  no network round-trip.
- **`hreflang` + canonical tags** are emitted for both locales; the original has neither.
- **A sitemap** is generated via `@astrojs/sitemap`.
- **Noto Sans Bengali is loaded** as a fallback face. The original's Latin fonts have no
  Bengali coverage, so `/bn` fell through to whatever the OS provided.

## Known gaps

- The `/demo` page copy is English-only in the original, so it has no Bangla translation.
  Its keys live under `demo.*` in `en.json`; add a `demo` block to `bn.json` to translate it
  (the fallback keeps it readable meanwhile).
- Footer links (`Changelog`, `About`, `Careers`, …) point at `#`, matching the original.
- `#compare` in the pricing footnote has no target on the original site either.
- The hero's sales bar chart renders empty. This reproduces the original exactly — the
  percentage-height bars sit in a flex column with indefinite height, so they resolve to
  zero there too. Fixing it would be a visual change, not a port fix.

## Assets

`public/assets/` holds the two logos (dark/light) and five product screenshots pulled from
the original. Template preview images are hotlinked from `static.sellsfie.com`, as on the
original.
