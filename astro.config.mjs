// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sellsfie.com',
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
