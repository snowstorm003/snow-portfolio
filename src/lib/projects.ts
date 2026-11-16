import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Operations', value: 'operations' },
  { label: 'AI', value: 'ai' },
  { label: 'Events', value: 'events' },
  { label: 'Community', value: 'community' },
  { label: 'Production', value: 'production' },
] as const;

export const filterValue = (category: string) => category.toLowerCase();

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

export async function getAllProjects() {
  return (await getCollection('projects')).sort(byOrder);
}

export async function getFeaturedProjects() {
  return (await getAllProjects()).filter((p) => p.data.featured);
}

/** Thumbnail: YouTube still → hero image → null (placeholder). */
export function thumbnailFor(p: Project): string | null {
  if (p.data.youtubeId) return `https://i.ytimg.com/vi/${p.data.youtubeId}/hqdefault.jpg`;
  if (p.data.heroImage) return p.data.heroImage;
  return null;
}
