import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import site from '../data/site.json';

/**
 * SHOW_TODOS (src/data/site.json)
 *   true  → "[TODO …]" markers are shown, in grey, so gaps are easy to spot.
 *   false → markers are removed; anything left empty (a sheet cell, a credit,
 *           a field-note section, a Kit cell) is hidden. The footer YouTube link
 *           is hidden while it has no URL, and the CV links are hidden while
 *           public/cv.pdf is still the placeholder.
 */
export const SHOW_TODOS: boolean = (site as { SHOW_TODOS?: boolean }).SHOW_TODOS !== false;

// Matches "[TODO]", "[TODO: …]" and "[TODO …]".
const TODO_RE = /\[TODO\b[^\]]*\]/g;

export const hasTodo = (s: string) => new RegExp(TODO_RE.source).test(s);

/** Plain text: keep as-is, or strip TODOs and tidy any "·" separators left dangling. */
export function todoText(s: string): string {
  if (SHOW_TODOS) return s;
  return s
    .replace(TODO_RE, '')
    .replace(/(\s*·\s*){2,}/g, ' · ')
    .replace(/^\s*·\s*|\s*·\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** HTML: wrap TODOs in a grey span, or strip them and drop paragraphs left empty. */
export function todoHtml(html: string): string {
  if (SHOW_TODOS) return html.replace(TODO_RE, (m) => `<span class="todo-mark">${m}</span>`);
  return html
    .replace(TODO_RE, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/[ \t]+<\/p>/g, '</p>')
    .trim();
}

/** True when the HTML has no visible text left. */
export const isEmptyHtml = (html: string) => !html.replace(/<[^>]+>/g, '').trim();

// The placeholder CV generated during the build contains this marker.
const CV_PATH = join(process.cwd(), 'public', 'cv.pdf');
const CV_MARKER = 'TODO: replace public/cv.pdf';
export const CV_IS_PLACEHOLDER =
  !existsSync(CV_PATH) || readFileSync(CV_PATH, 'latin1').includes(CV_MARKER);

/** Show the CV download links? */
export const SHOW_CV = existsSync(CV_PATH) && (SHOW_TODOS || !CV_IS_PLACEHOLDER);
