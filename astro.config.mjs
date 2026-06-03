// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL ?? 'https://example.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
