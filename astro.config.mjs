import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://henagon.id',
  integrations: [tailwind(), markdoc(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: false,
    }
  }
});
