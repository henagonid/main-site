import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';

import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), markdoc()],
  markdown: {
  //   remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    }
  }
});
