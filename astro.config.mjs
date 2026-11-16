// @ts-check
import { defineConfig } from 'astro/config';

// Canonical URL. Override per deploy with SITE_URL (e.g. on Vercel).
const site = process.env.SITE_URL || 'https://snowstorm-portfolio.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
});
