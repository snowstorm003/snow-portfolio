# Snow — Portfolio Website · Build Brief

> For Claude Code. Build this site from scratch. Work in the phases in §11 and **stop after each phase** for review.
> The `reference/` folder holds the approved design boards (`Main.dc.html`, `Project.dc.html`, `Style.dc.html`). They use a canvas runtime, so treat them as **visual and markup references only**: re-implement them, don't copy the runtime.

---

## 1. Who this is for, and the one rule

**Owner:** Tushar Mukhopadhyay, "Snow". **Positioning: Operations & Project Manager.**

The site must open doors to **operations and AI roles at product companies (including AI companies) and creative agencies**. It must **not** read as "video producer". Video is one context Snow has run operations in, not the craft.

**The rule for every content decision:** lead with what he *ran, planned and built* (systems, teams, budgets, processes, AI tooling). Films and events are evidence, not identity.

The look borrows from film production: call sheets, a clapperboard slate, film strips, end credits. That gives the site personality. The words stay operational.

---

## 2. Tech stack

- **Astro** (latest), static output. Plain CSS with custom properties, no Tailwind and no UI kit.
- Content in **Astro content collections**: one Markdown file per project, plus `src/data/site.json` for global settings.
- Client JS only where needed: the filter reel and the YouTube embed. Use small vanilla `<script>`s or Astro islands, no framework runtime.
- Fonts from Google Fonts (see §3), `display=swap`, with `preconnect`.
- Deploy target: **Vercel** (also works on Netlify). Leave a `README.md` with run, build and deploy steps.
- Lighthouse targets: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.

---

## 3. Design system

### Colour: only these, no others
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#EEEBE3` | Page background (cream) |
| `--ink` | `#151515` | Text, hairline rules, dark bands |
| `--accent` | `#B5301A` | "Tally red": the recording dot, link hover, one word, focus ring. Use sparingly. |
| `--graphite` | `#5C5A55` | Labels and metadata on paper |
| `--stock` | `#D8D3C7` | Image placeholders, subtle fills |

Allowed tints of the above (for text on dark bands and dividers only): `#4A4843` (soft ink / body grey / placeholder on dark), `#A8A499` (labels on ink), `#C9C4B8` (light rules, body on ink), `#E3DFD4` (hover fill on paper).
**No gradients, no shadows, no rounded cards, no extra colours.** (The earlier yellow and orange were rejected.)

### Type
- **Archivo** variable, with the width axis: `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=IBM+Plex+Mono:wght@400;500&display=swap`
- **IBM Plex Mono** for labels and metadata.

| Role | Spec |
|---|---|
| Display (name, section titles) | Archivo, `font-stretch: 66–70%`, weight 800, UPPERCASE, line-height .86–.9 |
| Section title | 64px desktop / ~44px mobile |
| Heading | Archivo 85%, 700, uppercase, 24–28px |
| Body | Archivo 100%, 400, 18–22px, line-height 1.45–1.55, max 60ch |
| Soft line (closing note) | Archivo 300, `clamp(20px, 2vw, 28px)`, `--soft-ink` `#4A4843`, centred |
| Label / metadata (`.mono`) | IBM Plex Mono 13px, UPPERCASE, letter-spacing .06em, colour graphite |

### Layout and detail rules
- Container: `max-width: 1280px`, side padding 40px (20px under 820px).
- **Hairline rules (1px ink) instead of cards.** Strong frames (the slate, the case boxes) use 2px ink borders.
- Section headings carry a small mono index above them: `01 —`, `02 —` …
- Every number appears **once**, next to the project it belongs to. No stats strip.
- Buttons are square-cornered; touch targets are at least 44px.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 2px`.
- Respect `prefers-reduced-motion`.

---

## 4. Site map

```
/                     Home
/work                 All work (same filter reel, as a grid)
/work/[slug]          Project page (one template)
/404                  "Missed the call time." + link home
```
Header and footer are shared by every page.

---

## 5. Page specs

### 5.1 Header (global)
- Left: wordmark **SNOW** (Archivo 72% stretch, 800, 26px), linking to `/`.
- Centre: mono nav: Work · Approach · Experience · Contact (home anchors; from other pages, link to `/#…`).
- Right: **CTA button**, a black square button with a red dot followed by the CTA label from `site.json` (default **"Get in touch"**), linking to `#contact`.
- Mobile: the nav collapses to a "Menu" toggle (accessible disclosure). The CTA stays visible.

### 5.2 Home: hero (the slate)
A clapperboard slate (see the `Main.dc.html` hero):
1. **Clapper bar:** 52px tall, 2px ink border with no bottom border, and diagonal stripes from `repeating-linear-gradient(-45deg, ink 0 32px, paper 32px 64px)`. This is the only stripe pattern on the site.
2. **Slate grid:** 2px ink frame, 6 columns.
   - Full-width top cell: label "PROD." with **TUSHAR MUKHOPADHYAY** below it, display type `clamp(52px, 9.4vw, 140px)`.
   - Bottom row: **Role** (spans 2): *Operations & Project Manager* · **Alias**: *"Snow"* (in accent) · **Studio**: *Little Unusual* · **Base**: *India* · **Take**: *01*.
   - Under 820px, the bottom row becomes 2 columns and Role spans the full width.
3. **Closing line**, directly under the slate with only ~36px gap. No box, no rule, centred, soft type:
   > I make complicated things run on time — shoots, events, teams, and lately, the AI workflows behind them.

   followed by a small mono "— Snow" in `#A8A499`.
4. The slate and the closing line together should fill about **60–70% of a laptop viewport**. Don't force full height.

### 5.3 Home: 01 Selected work (the filter reel)
See `Main.dc.html` → `#work`.
- Title row: "01 — Selected work" on the left, mono **"Showing N of M"** on the right.
- **Filter chips:** All · Operations · AI · Events · Community · Production. Each is a `<button aria-pressed>`, 44px tall, 1px ink border. The active chip is ink with paper text. Sync the filter to the URL (`?filter=ai`) so it can be shared.
- **Film strip:** an ink band with **sprocket holes** above and below. Holes are made with `background-image: linear-gradient(90deg, paper 0 16px, transparent 16px); background-size: 36px 10px; repeat-x`, on a 22px-tall strip.
- Inside, the frames sit in a horizontally scrollable row (`overflow-x: auto`, scroll-snap). **No auto-loop.**
- **Frame:** 300px wide.
  - A 16:9 thumbnail. Use the YouTube thumbnail if there is a video, otherwise the project's still, otherwise a `#4A4843` placeholder.
  - A **type tag** in the top-left corner on a paper chip: System / Video / AI demo / Report / Photo.
  - A play icon if `kind = Video`.
  - Title in paper, 19px bold, then mono meta in `#A8A499`.
- Each frame links to `/work/[slug]`.
- Under the strip: mono "Scroll the roll →" on the left and "All work →" (to `/work`) on the right.
- Show only projects with `featured: true`, sorted by `order`.

### 5.4 Home: 02 How I work (ink band)
A full-width ink section with three columns, each with a 1px paper top rule, an Archivo heading in caps and body text in `#C9C4B8`. **Draft copy, ops-first, flagged TODO for Snow to confirm:**
1. **Plan before anything moves.** Most projects are won or lost in the plan, weeks before anyone shows up.
2. **Small systems, big teams.** SOPs, trackers and automations that cut reporting by 3+ hours a week, so a 19-person team doesn't need me in every call.
3. **Build the tool when the tool doesn't fit.** When off-the-shelf software makes a team work around it, I build our own, increasingly with AI.

### 5.5 Home: 03 Experience (end credits)
Centred title. Each row is a two-column "credit": role on the left (mono, right-aligned, graphite), organisation on the right (Archivo 75%, 800, 30px, uppercase) with mono dates below. On mobile it becomes one left-aligned column.

| Role | Organisation | Dates |
|---|---|---|
| Creative Project Manager · Head of IRL | Little Unusual | Oct 2024 — Now · 19-person team |
| Operations | Hack4Bengal | Jan 2022 — Jul 2025 |
| Social Media & Publishing Associate | **[TODO company]** | **[TODO dates]** · Canva · WordPress · Admin |
| Community Manager | Kratos Gaming Network | Oct 2022 — Apr 2023 |
| Education | B.Tech, Computer Science | **[TODO college · year]** |

Below the table: an outlined button **"Download CV (PDF) ↓"** linking to `/cv.pdf`. Add a placeholder PDF and a TODO.
> Note: other Experience layouts (clickable timeline, "four acts", skills thread) exist on the design canvas for later. **Not in scope now.**

### 5.6 Home: 04 Kit
Three cells in a row, separated by hairline rules. Mono label, then a 20px line:
- **Edit:** Premiere · DaVinci · After Effects
- **Live:** OBS · Multi-cam switching
- **Ops:** Notion · Airtable · Linear
(TODO: Snow may add AI tools here.)

### 5.7 Footer (global): `id="contact"`
Ink background, paper text. See the footer in `Main.dc.html`.
1. Mono strip between hairlines (`#4A4843`): ● Contact · *Open to operations, AI & creative project roles* · *Remote / hybrid · India*
2. Headline (display, `clamp(56px, 10vw, 150px)`): **"Got something complex to run?"** Snow may later choose from: "Need someone to run the messy part?" / "Let's make it run." / "Got a process that needs a producer?"
3. Row: a paper button with a red dot and "{CTA label} →" (a `mailto:` with subject "Let's talk"), then the email as a text link with a 2px accent underline.
4. Four columns:
   - **Direct:** Email, +91 62905 61722
   - **Elsewhere:** LinkedIn ↗, X ↗, Telegram ↗, YouTube ↗ (TODO URL)
   - **Site:** Work, Approach, Experience, CV (PDF) ↓
   - **In short:** "Operations, production and AI workflows — for product teams and creative studios." + "Back to top ↑"
5. Bottom row in mono: **"That's a wrap."** · "Produced, directed & over-planned by Tushar Mukhopadhyay" · © {year}

### 5.8 Project page: `/work/[slug]`
See `Project.dc.html`. Sections, in order:
1. **Call-sheet strip:** a mono row of cells between ink rules: Production · Year · Format · Role · Crew/Scale · "Project NN / total" (in accent).
2. **Title** (display, `clamp(56px, 9vw, 140px)`) and a one-line **summary** (24px).
3. **Main media:** a YouTube embed if there's a `youtubeId`, otherwise a hero still, otherwise a placeholder. On an ink frame, show a "● Final cut" label for video.
4. **Field notes:** a 2-column grid (220px label / text), each row separated by a 1px ink rule:
   01 The brief · 02 What made it hard · 03 What we did · **04 What went wrong** (label in accent; the most human paragraph).
   Hide any section that is empty.
5. **Stills:** a grid of 3 at 4:3, only if stills exist.
6. **Ink band:** "On the sheet", up to 4 big numbers (display 56px) with mono labels · "Credits", a mono definition list.
7. **Previous / Next** project links, then the global footer.

### 5.9 `/work`
The same chips and counter as home, but frames shown as a responsive grid (3 or 4 per row) without the film-strip band. Each grid cell can carry a thin sprocket strip at the top for consistency.

---

## 6. Content model

`src/content/projects/*.md` frontmatter:
```yaml
title: "CatLumpurr Annual Summit"
slug: catlumpurr-2026
year: "2026"
category: Events          # Operations | AI | Events | Community | Production
kind: Video               # System | Video | AI demo | Report | Photo
meta: "2026 · 35 crew · 3,000 attendees"   # one line shown under the frame
summary: "Two days of conference, turned into six months of content."
role: "Head of production"
format: "Event film"
scale: "35 crew"
youtubeId: ""             # TODO
heroImage: ""             # optional
stills: []                # optional, up to 3
numbers:                  # max 4, shown on the ink band
  - { label: "Attendees", value: "3,000+" }
credits:
  - { role: "Head of production", name: "Tushar “Snow” M." }
featured: true
order: 4
```
Markdown body sections use H2s that map to the field notes: `## The brief`, `## What made it hard`, `## What we did`, `## What went wrong`.

`src/data/site.json`:
```json
{
  "name": "Tushar Mukhopadhyay",
  "alias": "Snow",
  "title": "Operations & Project Manager",
  "studio": "Little Unusual",
  "base": "India",
  "ctaLabel": "Get in touch",
  "email": "tusharmukhopadhyay03@gmail.com",
  "phone": "+91 62905 61722",
  "socials": {
    "linkedin": "https://www.linkedin.com/in/snowstorm003/",
    "x": "https://x.com/snowstorm003",
    "telegram": "https://t.me/snowstorm003",
    "youtube": ""
  }
}
```

---

## 7. Project content (seed all of these; keep TODOs visible as `[TODO: …]`)

Order in the reel is as listed.

1. **Global events staffing planner** · Operations · System · `2026 · Little Unusual`
   - Brief: a year of summits, conferences and residency-style events across several countries, each needing a different crew.
   - What we did: one planner with crew models by event type and country, so staffing is decided once, not per event.
   - Result / numbers: [TODO outcome: events covered, hours saved]. Media: [TODO planner screenshot].
2. **Production systems & SOPs** · Operations · System · `2024–now · 19-person team`
   - Brief: a 19-person department running documentaries, event films, podcasts and livestreams at the same time.
   - What we did: SOPs, a remote-shoot checklist and automated reporting.
   - Numbers: ~20% more tasks completed · 3+ hrs/week saved on reporting · 4.6/5 internal CSAT across 6 programs · budgets up to ₹8.5 lakh.
3. **In-house AI ops platform** · AI · AI demo · `Now building`
   - Brief: off-the-shelf ops tools make the team work around them.
   - What we did: building an in-house, AI-assisted operations platform shaped around how the team actually works.
   - [TODO: what it does so far, first results, screen recording]. Mark the page "In progress".
4. **CatLumpurr Annual Summit** · Events · Video · `2026 · 35 crew · 3,000 attendees`
   - Summary: Two days of conference, turned into six months of content — with the biggest crew I've put together.
   - Brief: cover a 3,000-attendee corporate summit across multiple session halls, and leave the client a content pipeline that keeps running after the event.
   - Hard: scale. Multiple halls at once, a 35-person crew to hire, train and schedule across departments, and kit to source and move.
   - Did: months of pre-production (venue recces, equipment and logistics, crew hiring and scheduling, a content plan agreed with stakeholders before day one). On the ground: 200+ hours of footage, 40+ speaker interviews, daily recaps cut during the event.
   - Went wrong: [TODO one honest story].
   - Numbers: 3,000+ attendees · 35 crew · 28 deliverables · 200h+ raw footage. Credits: Head of production — Tushar "Snow" M. · Studio — Little Unusual · Client — [TODO] · Director/DOP — [TODO].
5. **Crypto Content Creator Campus** · Events · Video · `2024 · 3 stages · 1,500+`
   - Led media production for a flagship Web3 event: 1,500+ attendees, 3 stages, 22 crew. [TODO brief/hard/did/wrong, YouTube]
6. **Hack4Bengal** · Community · Photo · `2022–25 · 100+ events`
   - Brief: a volunteer-run tech community growing faster than its processes.
   - Did: SOPs and documentation for running everything from 50-person meetups to 500+ hackathons.
   - Numbers: 100+ events · 4 hackathons of 500+ · 6,000+ members · budgets ₹20k–₹6L. The SOPs are still in use. [TODO photos]
7. **Kratos Gaming Network** · Community · Report · `2022–23 · 300–400 users`
   - Brief: a new gaming/Web3 product with little signal from real users.
   - Did: ran the 1,000+ member community and turned feedback from 300–400 early users into product reports for UX improvements. [TODO report excerpt]
8. **Ajinkya, Ladakh — Superstories by Superteam** · Production · Video · `2023 · Documentary`
   - Led production for a documentary series episode filmed at 14,000+ ft in the Himalayas. [TODO brief/hard/did/wrong, YouTube]

Not featured, but create pages (`featured: false`): **Solana Breakpoint** (2023 · conference coverage · [TODO role, numbers]) and **Web3 Podcast Series** (2024 · end-to-end production · [TODO]).

---

## 8. Behaviour details

- **YouTube:** use a "lite" embed. Show the thumbnail (`i.ytimg.com/vi/{id}/hqdefault.jpg`) with a play button, and load the `youtube-nocookie.com` iframe only on click. Give each a `title` attribute.
- **Filter reel:** works without JS (all frames shown). With JS: chips filter, the counter updates, `aria-pressed` toggles, `?filter=` stays in sync and survives reload. Announce count changes via `aria-live="polite"`.
- **Reduced motion:** no smooth-scroll and no transitions longer than 150ms.
- **Responsive:** check 375px, 768px, 1280px and 1440px. The slate collapses (§5.2), field notes stack, footer columns wrap, and the film strip stays horizontally scrollable with scroll-snap.
- **Accessibility:** semantic landmarks, one H1 per page, real `<button>` and `<a>`, visible focus, colour contrast ≥ 4.5:1 for all text (graphite and `#A8A499` on ink both pass; don't put accent text below 16px on paper), alt text for every image, and a "skip to content" link.
- **SEO:** a unique `<title>` and description per page. OG and Twitter cards (generate a default OG image in the paper/ink style with the slate name). `sitemap.xml`, `robots.txt`, canonical URL configurable (old site used `https://snowstorm-portfolio.com`). JSON-LD `Person` on home.
- **Favicon:** a red dot on paper.

---

## 9. Out of scope (for now)
Featured In / press section (removed and coming back later with real links) · alternative Experience layouts · blog · CMS · analytics (leave a hook).

---

## 10. Acceptance checklist
- [ ] Only the colours in §3 are used anywhere (grep the CSS).
- [ ] Home order: Header → Slate → closing line → 01 Selected work → 02 How I work → 03 Experience → 04 Kit → Footer.
- [ ] The slate reads "Operations & Project Manager"; the Little Unusual credit reads "Creative Project Manager · Head of IRL".
- [ ] The filter reel works with and without JS, and `?filter=ai` loads pre-filtered.
- [ ] Every project in §7 has a page; empty sections are hidden; TODOs are visible.
- [ ] YouTube loads only on click.
- [ ] Lighthouse targets in §2 are met on home and one project page.
- [ ] Looks right at 375 / 768 / 1280 / 1440.
- [ ] `README.md` explains how to edit content (add a project, set a YouTube ID, change the CTA label) and how to deploy.

---

## 11. Build phases: stop and wait for approval after each

1. **Scaffold:** Astro project, design tokens, fonts, base layout, global header and footer. Show me the empty home page with header and footer.
2. **Home hero and Selected work:** the slate, the closing line, and the filter reel with seeded content.
3. **Rest of home:** How I work, Experience, Kit.
4. **Project template and `/work`:** all project pages from §7, lite YouTube embed, previous/next links.
5. **Polish:** responsive pass, accessibility, SEO and OG, 404, favicon, README, Lighthouse run. Report scores and any TODOs left.

At the end of each phase: summarise what changed, list any decisions you made, and wait.
