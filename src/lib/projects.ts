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

export interface FieldNote { id: string; label: string; html: string; }

const NOTE_ORDER = ['the-brief', 'what-made-it-hard', 'what-we-did', 'what-went-wrong'];

/** Wrap "[TODO: …]" markers so they stay visible but read as placeholders. */
export const markTodos = (html: string) =>
  html.replace(/\[TODO:[^\]]*\]/g, (m) => `<span class="todo-mark">${m}</span>`);

/**
 * Split the rendered Markdown body into the four field-note sections by their H2s.
 * Sections that are missing or empty are dropped.
 */
export function fieldNotes(p: Project): FieldNote[] {
  const html = p.rendered?.html ?? '';
  const parts = html.split(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/);
  const notes: FieldNote[] = [];
  for (let i = 1; i < parts.length; i += 3) {
    const body = parts[i + 2].trim();
    if (!body.replace(/<[^>]+>/g, '').trim()) continue;
    notes.push({ id: parts[i], label: parts[i + 1].replace(/<[^>]+>/g, ''), html: markTodos(body) });
  }
  return notes.sort((a, b) => {
    const ia = NOTE_ORDER.indexOf(a.id), ib = NOTE_ORDER.indexOf(b.id);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
}

/** Field notes keep fixed numbers (01 brief … 04 what went wrong) even when one is hidden. */
export const noteNumber = (id: string) => {
  const i = NOTE_ORDER.indexOf(id);
  return i < 0 ? '—' : String(i + 1).padStart(2, '0');
};
