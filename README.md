# Snow — portfolio

The portfolio site of **Tushar “Snow” Mukhopadhyay**, Operations & Project Manager.
Built with [Astro](https://astro.build) as a fully static site: plain CSS, no UI framework, and a few small vanilla scripts (filter reel, mobile menu, YouTube embed).

The approved design boards live in [`reference/`](reference/). They're visual references only.

---

## Run it locally

Needs **Node 22.23.4 or newer**.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321. To check the production build:

```bash
npm run build
```

```bash
npm run preview
```

---

## Where things live

| What | File |
|---|---|
| Name, title, studio, email, phone, socials, **CTA label**, **`SHOW_TODOS`** | `src/data/site.json` |
| “How I work”, Experience rows, Kit (shown in the order listed: Ops → AI → Live → Edit) | `src/data/home.json` |
| Projects (one file each) | `src/content/projects/*.md` |
| Project fields (the schema) | `src/content.config.ts` |
| Colours, type, buttons | `src/styles/global.css` |
| CV download | `public/cv.pdf` (currently a placeholder) |
| Share image + PNG favicons | `public/og-default.png`, `public/apple-touch-icon.png`, `public/favicon-32.png` |

---

## Editing content

### Change the CTA label
Edit `ctaLabel` in `src/data/site.json` (e.g. `"Say hello"`). It updates the header button and the footer button.

### Add a project
1. Copy any file in `src/content/projects/` and rename it, e.g. `my-project.md`.
2. Fill in the frontmatter:

```yaml
---
title: "My project"
slug: my-project          # becomes /work/my-project
year: "2026"
category: Operations      # Operations | AI | Events | Community | Production
kind: System              # System | Video | AI demo | Report | Photo
meta: "2026 · 12 crew"    # the one line under the frame
summary: "One sentence about what you ran."
role: "Head of production"
format: "Event film"
scale: "12 crew"
status: ""                # e.g. "In progress"
placeholder: "Screenshot" # label shown while there is no media yet
youtubeId: ""             # see below
heroImage: ""             # e.g. /images/my-project.jpg (put the file in public/images/)
heroAlt: ""
stills: []                # up to 3: - { src: "/images/a.jpg", alt: "What it shows" }
numbers:                  # up to 4, shown on the black band
  - { label: "Attendees", value: "500+" }
credits:
  - { role: "Head of production", name: "Tushar “Snow” M." }
featured: true            # show on the home reel
order: 9                  # position in the reel and in /work
---
```

3. Write the field notes as H2 sections. Any you leave out are hidden:

```md
## The brief
## What made it hard
## What we did
## What went wrong
```

Anything written as `[TODO: …]` stays visible (in grey) so gaps are easy to spot — see `SHOW_TODOS` below.

### Hide the TODOs (`SHOW_TODOS`)
`SHOW_TODOS` in `src/data/site.json` defaults to `true`, which shows every `[TODO …]` marker in grey while content is being filled in. Set it to `false` before launch and rebuild:

- every `[TODO …]` text is removed, and anything left empty is hidden (a call-sheet cell, a credit, a whole field-note section, a Kit cell, an Experience row with no organisation);
- the footer **YouTube** link is hidden while `socials.youtube` is empty;
- the **Download CV** button and footer **CV** link are hidden while `public/cv.pdf` is still the placeholder (the build checks the file for the placeholder's marker text).

Placeholder frames on the film strip stay either way.

### Set a YouTube video
Take the ID from the video URL (`https://www.youtube.com/watch?v=`**`aqz-KE-bpKQ`**) and put it in the project's frontmatter:

```yaml
youtubeId: "aqz-KE-bpKQ"
```

The frame on the reel then uses the YouTube thumbnail, and the project page shows a click-to-play embed. The YouTube player (from `youtube-nocookie.com`) only loads when someone presses play.

### Replace the CV
Overwrite `public/cv.pdf` with the real file (keep the name).

### Regenerate the share image
If the name or title in `site.json` changes, regenerate the share image and PNG favicons. This needs Playwright:

```bash
npm i -D playwright && npx playwright install chromium
```

```bash
npm run images
```

---

## Deploy

### Vercel (recommended)
1. Push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new). Vercel detects Astro automatically: build `npm run build`, output `dist`.
2. In **Settings → Environment Variables**, set `SITE_URL` to the live domain (e.g. `https://snowstorm-portfolio.com`). It's used for canonical URLs, the sitemap and social cards. Without it, the site falls back to `https://snowstorm-portfolio.com`.
3. Add the custom domain under **Settings → Domains**.

### Netlify
Build command `npm run build`, publish directory `dist`, and the same `SITE_URL` variable.

### Analytics
There's a marked hook at the end of `<head>` in `src/layouts/Base.astro` for a privacy-friendly analytics snippet.

---

## Quality targets
Lighthouse (mobile and desktop) on home and project pages: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100. Only the palette in `src/styles/global.css` is used anywhere; no gradients (other than the slate stripes and sprocket holes), shadows or rounded cards.
