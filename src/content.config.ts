import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['Operations', 'AI', 'Events', 'Community', 'Production'] as const;
export const KINDS = ['System', 'Video', 'AI demo', 'Report', 'Photo'] as const;

const projects = defineCollection({
  // The `slug` frontmatter field becomes the entry id (and the URL).
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.string(),
    category: z.enum(CATEGORIES),
    kind: z.enum(KINDS),
    meta: z.string(),
    summary: z.string(),
    role: z.string().default(''),
    format: z.string().default(''),
    scale: z.string().default(''),
    status: z.string().default(''),         // e.g. "In progress"
    placeholder: z.string().default(''),    // label shown while media is missing
    youtubeId: z.string().default(''),
    heroImage: z.string().default(''),      // path under /public, e.g. /images/foo.jpg
    heroAlt: z.string().default(''),
    stills: z.array(z.object({ src: z.string(), alt: z.string() })).max(3).default([]),
    numbers: z.array(z.object({ label: z.string(), value: z.string() })).max(4).default([]),
    credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { projects };
