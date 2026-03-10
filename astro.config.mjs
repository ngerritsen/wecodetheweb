import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wecodetheweb.com',
  integrations: [mdx()],
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
