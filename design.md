# chanpio.work Design System

The design system behind www.chanpio.work. Every value here comes from `assets/style.css`. That file is the source of truth, so change values there first and then update this document.

**Contents:** Foundations (principles, color, typography, spacing, radius, elevation, layout, motion) → Components → Page patterns → Content rules → Accessibility → Open issues

---

## 1. Principles

1. **Calm surface, one lively moment.** Pages are mostly white and black. The only moving element is the hero, where a Now Nudge demo acts out the work itself: an AI that reads the conversation and offers the next step.
2. **Alternate light and dark.** White sections carry the work. Rounded black bands carry identity and proof (philosophy, numbers, outcomes, lessons). Moving between them gives the scroll its rhythm.
3. **Soft geometry.** Large radii on every container and full pills on every control. There are no sharp corners and no hairline-heavy layouts.
4. **Two voices from one family.** Instrument Serif speaks in the headings (hero, case titles, section titles, card titles, the about statement); Instrument Sans carries everything you read, tap or count. Secondary information gets graphite, not a smaller size.
5. **Blue means "next."** The single accent marks eyebrows, hover, the chosen option, and highlighted results, and nothing else.

---

## 2. Color

### 2.1 Core tokens

| Token | Light | Dark mode | Role |
|---|---|---|---|
| `--paper` | `#FFFFFF` | `#0B0B0C` | Page background |
| `--ink` | `#000000` | `#F5F5F7` | Primary text, dark pill fill |
| `--graphite` | `#6E6E73` | `#A1A1A6` | Secondary text: meta, captions, ledes |
| `--soft` | `#F2F2F4` | `#1C1C1E` | Soft pill, stat pill, compare box, callout, image placeholder |
| `--hairline` | `#E8E8EC` | `#2C2C2E` | Dividers, soft-pill hover |
| `--blue` | `#3B8EF0` | `#3B8EF0` | Accent fills: hover, focus ring, chosen state, dots |
| `--blue-text` | `#1B66C9` | `#5EA3F3` | Blue as text: eyebrow, flow labels, the After label (5.5:1 on white, 5.0:1 on `--soft`) |

### 2.2 Night tokens (dark bands)

| Token | Light page | Dark mode | Role |
|---|---|---|---|
| `--night` | `#000000` | `#161618` | Band background |
| `--night-card` | `#1C1C1E` | `#232326` | Cards inside a band |
| `--night-line` | `#2C2C2E` | `#2C2C2E` | Row dividers inside a band |
| `--night-text` | `#F5F5F7` | `#F5F5F7` | Body text on night |
| `--night-dim` | `#A1A1A6` | `#A1A1A6` | Secondary text on night |
| `blue-on-night` | `#7DB6FF` | `#7DB6FF` | Accent on black (lighter for contrast); not yet a token |

In dark mode, bands lift to `#161618` so they still separate from the `#0B0B0C` page.

### 2.3 Hero sky

The hero card uses a fixed palette that does not change in dark mode.

| Layer | Value |
|---|---|
| Base gradient (top → bottom) | `#CFE2F7` → `#E6EEF8` (45%) → `#F6EFE6` |
| Warm glow, bottom center | radial `#F7E9D6` |
| Lilac glow, bottom left | radial `#E9E1FF` |
| Placeholder tile (no image) | linear 160° `#CFE2F7` → `#EFE6FF` → `#F6EFE6` |

### 2.4 Chip palette

These colors were the hero's floating chips and the about band's loop icons. Both are gone, so the palette is retired; keep it only as history.

| Chip | Color | | Chip | Color |
|---|---|---|---|---|
| Add to Calendar | `#3B8EF0` | | Open map | `#FFB341` |
| Share photos | `#FF6FA6` | | Reorder coffee | `#C2733A` |
| Translate | `#22B07D` | | Set reminder | `#FF5A4F` |
| View calendar | `#8B5CF6` | | Summarize | `#111111` |

The nav no longer carries a brand mark; the wordmark stands alone.

### 2.5 Usage rules

- Text is `--ink` or `--graphite`. Never set body text in blue.
- Blue appears at most once per viewport as a label (the eyebrow). Everything else blue is a state: hover, focus, or chosen.
- Chip colors stay in the loop icons. Don't reuse them for charts or tags.

---

## 3. Typography

### 3.1 Typeface

| Role | Family | Weights | Source |
|---|---|---|---|
| Display: h1, h2, card titles, about statement | **Instrument Serif** | 400, 400 italic | Google Fonts |
| Text: body, UI, labels, numbers, small headings (h3 and below) | **Instrument Sans** | 400, 500, 600 | Google Fonts |
| Fallbacks | Georgia / `system-ui, -apple-system, "Segoe UI", sans-serif` | — | System |

```css
--font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
--font-text: "Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
font-synthesis: none;
-webkit-font-smoothing: antialiased;
```

**Weights have jobs:** the serif has one weight, so headings rank by size and get 10–20% more of it than the old sans (h1 42–74px, h2 34–54px, case h2 31–40px, card titles 29–33px) with a tight 1.02–1.1 line height. *Italic* marks the one word a heading turns on ("knows"). In the sans: 600 for small headings and numbers, 500 for UI and emphasis, 400 for reading. The serif never goes below about 26px, and numbers, stats and the demo's phone UI stay in the sans. The résumé prints in Arial for ATS.

### 3.2 Fluid scale (display and headings)

Values resolve at a 390px phone and a 1280px desktop.

| Token | CSS | 390 | 1280 | Wt | LH | Tracking | Used for |
|---|---|---|---|---|---|---|---|
| `display` | `clamp(38px, 5.6vw, 64px)` | 38 | 64 | 600 | 1.12 | −0.03em | Home hero h1 |
| `title` | `clamp(34px, 5vw, 58px)` | 34 | 58 | 600 | 1.12 | −0.03em | Case h1 (max 18ch) |
| `heading-1` | `clamp(30px, 4vw, 46px)` | 30 | 46 | 600 | 1.22 | −0.02em | Section h2, footer CTA |
| `number` | `clamp(30px, 3.4vw, 40px)` | 30 | 40 | 600 | 1.1 | −0.03em | Stats, outcomes |
| `heading-2` | `clamp(26px, 3vw, 34px)` | 26 | 34 | 600 | 1.2 | −0.02em | Case body h2 |
| `statement` | `clamp(22px, 2.6vw, 30px)` | 22 | 30 | 600 | 1.3 | −0.025em | Lesson (max 24ch) |
| `card-title` | `clamp(24px, 2.4vw, 28px)` | 24 | 28 | 600 | 1.55* | −0.025em | Project card h3 |
| `quote` | `clamp(22px, 2.4vw, 26px)` | 22 | 26 | 500 | 1.4 | −0.02em | Pull quotes |
| `lead` | `clamp(19px, 1.9vw, 22px)` | 19 | 22 | 400 | 1.55 | −0.01em | Case summary |
| `hero-sub` | `clamp(18px, 2vw, 22px)` | 18 | 22 | 500 | 1.55 | −0.01em | Under the hero h1 |

\* Inherited. See Open issues.

### 3.3 Fixed scale (UI and reading)

| Token | Size | Wt | LH | Tracking | Used for |
|---|---|---|---|---|---|
| `title-s` | 22 | 600 | 1.55* | −0.02em | Loop card h3, next-project link |
| `heading-3` | 19 | 600 / 500 | 1.55 | −0.015em | Case body h3 (600), experience row (500) |
| `brand` | 18 | 600 | — | −0.02em | Wordmark |
| `lede` | 18 | 400 | 1.6 | 0 | Section intro, graphite, max 46ch |
| `body` | **17** | 400 | 1.55 | 0 | Base reading size |
| `ui` | 16 | 500 | 1.0 | 0 | Nav, pills, chips, eyebrow |
| `meta` | 15 | 400 | inherit | 0 | Card meta, rail, outcome labels, row sub |
| `caption` | 14 | 400 | inherit | 0 | Figure captions, fine print, stat label |
| `tag` | 13 | 600 | inherit | 0 | "Chosen" tag; chips on mobile (500) |

### 3.4 Measure

| Context | Max width |
|---|---|
| Case study body column | 680px (about 70 characters at 17px) |
| Ledes, card descriptions | 46ch |
| Case title | 18ch |
| Lesson statement | 24ch |

---

## 4. Spacing

The system uses a 4px base. Section spacing is fluid; component spacing is fixed.

### 4.1 Component scale

| Step | px | Typical use |
|---|---|---|
| 1 | 4 | Card-text side inset, card-title top margin |
| 2 | 6 | Nav gap, stat-pill gap, list-item margin |
| 3 | 8 | Pill icon gap, card-title bottom margin, figcaption, outcome label gap |
| 4 | 10 | Pill group gap, brand gap |
| 5 | 12 | Header inset, image-row gap, outcome grid gap, pill vertical padding |
| 6 | 14 | Eyebrow → heading, card description → stat |
| 7 | 16 | Header gap, numbers gap, list-head bottom |
| 8 | 20 | Pill horizontal padding, card-text top, loop gap, row gap, lede top |
| 9 | 24 | Row vertical padding, placeholder padding |
| 10 | 28 | Numbers padding, loop card side padding, case h3 top |
| 11 | 32 | Pills top margin, loop card top padding |
| 12 | 36 | Figure margin in case body |

### 4.2 Section rhythm (fluid)

| Token | CSS | 390 | 1280 | Used for |
|---|---|---|---|---|
| `section-xl` | `clamp(100px, 14vw, 160px)` | 100 | 160 | Footer top |
| `section-l` | `clamp(80px, 12vw, 140px)` | 80 | 140 | Intro top, grid bottom, dark band padding |
| `section-m` | `clamp(64px, 9vw, 104px)` | 64 | 104 | Case h2 top, lesson top, next-nav top |
| `section-s` | `clamp(56px, 8vw, 88px)` | 56 | 88 | Loop grid top, case band padding (96 max) |
| `block` | `clamp(40px, 6vw, 64px)` | 40 | 64 | Intro bottom, case head bottom, outcomes top |
| `gutter` | `clamp(16px, 4vw, 40px)` | 16 | 40 | Page side padding |

Case head top uses `clamp(130px, 16vw, 180px)` to clear the fixed nav.

---

## 5. Radius

| Token | Value | Used for |
|---|---|---|
| `--r-xl` | 48px | Hero card (bottom corners), dark bands, case cover |
| `--r-lg` | 32px | Project thumbnails, loop cards, numbers panel, lesson card; bands and cover on mobile |
| `--r-md` | 20px | Figures, outcome cards, compare boxes, callouts |
| — | 22px | Loop icon tile (should become `--r-md`) |
| pill | 999px | Nav bar, buttons, chips, stat pills, tags, focus ring |
| circle | 50% | Step numbers |

**Nesting rule:** an inner element's radius is smaller than its container's. For example, a 20px outcome card sits inside a 48px band.

---

## 6. Elevation and materials

The system is mostly flat. Depth comes from blur and color, not shadow.

| Material | Recipe | Used for |
|---|---|---|
| Frosted bar | `paper` at 72% + `backdrop-filter: saturate(1.6) blur(18px)` | Fixed nav |
| Metal tile | linear 145° `#4A4A4F → #1F1F22`, inner top highlight `rgba(255,255,255,.25)`, drop `0 10px 24px -10px #000` | Loop icons |

There are no card shadows on white. Cards are separated by the image tile and spacing alone.

---

## 7. Layout

| Token | Value | Role |
|---|---|---|
| `--wide` | 1080px | Max content width (`.wrap`) |
| `--col` | 680px | Case study reading column |
| `--gutter` | 16–40px fluid | Side padding |

### 7.1 Grids

| Grid | Desktop | ≤760px |
|---|---|---|
| Project cards | 2 columns, gap 20–32px | 1 column |
| Loop cards | 3 columns, gap 20px | 1 column |
| Numbers | 4 columns | 2 columns |
| Case header | 220px rail + 1fr, gap 24–72px | 1 column (≤820px); rail becomes 2 columns |
| Outcomes | auto-fit, min 170px, gap 12px | auto |
| Image row | 2 or 3 equal columns, gap 12px | 1 column (≤600px) |

### 7.2 Breakpoints

| Width | What changes |
|---|---|
| 820px | Case header stacks |
| 1024px | Hero stacks: copy over the demo, which drops to its 358px compact design |
| 760px | Grids collapse; bands inset 8px with 32px radius; bleed figures stop bleeding |
| 640px | Experience rows stack |
| 600px | Image rows stack; hero h1 drops its forced line break |
| 480px | "About" nav link hides |

### 7.3 Alignment

- Section openers (eyebrow, h2, lede, pills) are **centered**.
- Cards, rows, and case body text are **left-aligned**.
- Figure captions, quotes, and the lesson card are centered.

---

## 8. Motion

| Motion | Spec | Trigger |
|---|---|---|
| Hero rise | 0.9s `cubic-bezier(.2,.8,.2,1)`, 16px up + fade | Page load, once |
| Nudge demo | About 11s a run. Plays 3 times, each run holding the result 3.2s, then fading out (0.4s) to the opening frame; after the third it holds on the result and shows Replay, which plays it 3 times again. The Knowing / Anticipating / Acting list lights in step. Under reduced motion it shows the finished frame, no Replay | Hero, on load |
| Thumb zoom | scale 1.03 over 0.6s `cubic-bezier(.2,.8,.2,1)` | Card hover |
| Color shift | 0.2s on background, color, border | Pill hover |
| Smooth scroll | `scroll-behavior: smooth` | Anchor links |

**Rule:** all of the above is wrapped in `prefers-reduced-motion: no-preference` or switched off under `reduce`. Only the hero moves on its own.

---

## 9. Components

### 9.1 Pill button

| Variant | Fill | Text | Border | Hover | Where |
|---|---|---|---|---|---|
| `.pill.dark` | `--ink` | `--paper` | — | fill → blue, text white | Primary action (Resume, Email me) |
| `.pill.soft` | `--soft` | `--ink` | — | fill → `--hairline` | Secondary (LinkedIn, All work, quick links) |
| `.pill.light` | `#FFF` | `#000` | — | fill → blue | Primary on a dark band |
| `.pill.line` | transparent | `#FFF` | 1px white | fill → blue | Secondary on a dark band |

Spec: padding 12×20 (11×18 in the nav), 16/500, line-height 1, radius 999px, icon gap 8px. Group with `.pills`: centered flex, gap 10px, 32px top margin.

### 9.2 Navigation bar

A fixed frosted pill 12px from the top, max 1080px wide, with padding `8 8 8 20`. The wordmark “Chanpio Park” sits on the left, with no logo. Text links and a dark Resume pill sit on the right. The container ignores pointer events so the hero stays clickable around it.

### 9.3 Hero card

Full width minus the gutter, sized to its content, with only the bottom corners rounded to 48px. Two columns on the sky gradient: on the left a `display` h1, a `hero-sub` line, the Knowing / Anticipating / Acting list and a Replay pill that appears once the demo rests; on the right the Now Nudge demo, its phone running off the card's foot. Below 1024px the copy stacks over the demo.

### 9.4 Now Nudge demo

A faux One UI screen built with the stageshow kit: Samsung Messages, the Samsung Keyboard toolbar with the Open calendar nudge, and the Galaxy status bar, matched to the shipped screens in the Now Nudge case study. Source in `hero/`, built to `assets/hero/` with `npm run build` (see `hero/README.md`). The stage is one `role="img"` with a description; the site's global CSS is fenced off it with `:not(:where(.ss-stage *))`.

### 9.5 Project card

The whole card is one link. It contains:
1. Thumbnail at 4:3, 32px radius, `--soft` placeholder. If there is no image, a gradient tile shows the project name.
2. Meta at 15 graphite: "Org · Year".
3. Title in `card-title`, which turns blue on hover.
4. Description at 17 graphite, max 46ch.
5. Stat pill: `--soft` fill, 7×14 padding, value 16/600 + label 14/400.

### 9.6 Dark band

`--night` background with `section-l` vertical padding. The home page version (`.rounded`) is inset by the gutter with 48px radius on all corners. In a case study, the band follows the cover with the same inset and radius.

### 9.7 Loop card (on night)

`--night-card` fill, 32px radius, padding `32 28 30`. It contains a 72px metal icon tile (22px radius) with a colored inner shape, a 22/600 white title, and a 17 night-dim description.

| Card | Inner shape |
|---|---|
| Knowing | Circle, radial `#9CC8FF → #3B8EF0` |
| Anticipating | Pill, linear `#FF9CC2 → #FF6FA6` |
| Acting | Rounded square, linear `#7EE0B5 → #22B07D` |

### 9.8 Stat panel / outcome card

- **Numbers panel (home):** a single `--night-card` panel, 32px radius, 28px padding, 4 columns.
- **Outcome cards (case):** separate `--night-card` tiles, 20px radius, padding `22 22 20`, auto-fit.

Both use a `number` value over a 15px night-dim label. A highlighted value (`<em>`) is set in blue-on-night.

### 9.9 List row (FAQ style)

Grid `1fr auto auto 20px` with 24px vertical padding and a 1px `--night-line` bottom border. It holds the title (19/500), sub and year (15 night-dim), and a › chevron (22 night-dim). On hover, the title and chevron turn blue. Under 640px it stacks into the title, then sub, then year, with the chevron spanning the rows.

### 9.10 Case header

A centered eyebrow (project name), a `title` h1, and a "Org · Year" meta line in graphite. Below it sits the cover image at 48px radius (32px on mobile), max 680px tall.

### 9.11 Compare box

`--soft` fill, 20px radius, padding 20×22, with a 2px transparent border. The chosen box (`.pick`) gets a blue border, an 8% blue tint, and a blue "Chosen" tag pill. Its title is 17/600 and its list is 15, with cons in graphite.

### 9.12 Steps

An ordered list with a 48px left inset. Each number sits in a 32px black circle (14/600, white). Each item holds a `heading-3` and a body paragraph.

### 9.13 Callout, quote, lesson

| Component | Spec |
|---|---|
| Callout | `--soft` fill, 20px radius, padding 22×24, body text at 500 in ink |
| Quote | `quote` style, centered, with a 15 graphite `cite` below |
| Lesson | Black card, 32px radius, 32–48px padding, centered; blue-on-night label, `statement` in white, supporting line in night-dim |

### 9.14 Figure

| Variant | Behavior |
|---|---|
| `.fig` | Full column width, 20px radius, 36px vertical margin |
| `.fig.bleed` | Breaks out of the 680px column to the 1080px container |
| `.fig.narrow` | Max 340px, centered (tall phone screenshots) |
| `.fig.row.r2` / `.r3` | 2 or 3 images side by side, 12px gap |
| caption | 14 graphite, centered, 10px top margin |

Animated GIFs ship as `<video autoplay muted loop playsinline>` with a WebP poster image.

### 9.15 Footer

Centered: a "Contact" eyebrow, a `heading-1` line, a graphite lede, then dark Email + soft LinkedIn + soft Resume pills, with the © line 72–120px below.

---

## 10. Page patterns

### Home
```
[ frosted nav pill                                   ]
[ hero card: sky · h1 + loop list | Now Nudge demo   ]   bottom radius 48
  eyebrow · heading-1 · soft pill links                   centered
  [card][card]                                            2-col grid
  [card][card]
  [card][card]
[ dark band (rounded 48)                             ]
[   glyph · heading-1 · lede · light/line pills      ]
[   [loop][loop][loop]                               ]
[   [ numbers panel ×4                ]              ]
[   Experience ............... Full resume ›         ]
[   row ──────────────────────────── 2024–now   ›    ]
footer: eyebrow · heading-1 · lede · pills · ©
```

### Case study
```
[ frosted nav pill ]
  eyebrow (project) · title h1 · meta              centered
[ cover image, radius 48                          ]
[ dark band: rail | summary  ·  outcome cards     ]   radius 48
      body column 680:
      h2 · p · steps · compare · fig · callout · quote
      [ lesson card (black) ]
      All work (soft pill) ............ Next project ›
footer
```

---

## 11. Content rules

- **Sentence case** for every heading, button, and label. No all-caps.
- **Buttons say what happens:** "Email me", "Read the case study". Avoid "Learn more" or "Click here".
- **Nudges are 2–3 word verbs:** "Open calendar", "Share photos".
- **Numbers lead:** put the metric first in stat pills and outcome cards ("42M+ Galaxy devices").
- **Meta format:** "Org · Year" with a middle dot.
- **No → arrows in link text.** Use › only in list rows and the next-project link.

---

## 12. Accessibility

- **Focus:** 2px blue outline, 3px offset, pill radius on every link and button.
- **Contrast:** graphite `#6E6E73` on white is 5.0:1, which passes AA for body text. Night-dim `#A1A1A6` on black is 8.2:1. Blue `#3B8EF0` on white is only 3.3:1, which is below AA (4.5:1) for the 16px eyebrow. See Open issues.
- **Motion:** every animation respects `prefers-reduced-motion`.
- **Skip link:** every page opens with a “Skip to content” link to `#main`, shown on keyboard focus. Anchors land below the fixed nav (`scroll-margin-top: 96px`).
- **Moving content:** every looping case-study video has a pause/play button (`assets/site.js`) and does not autoplay under reduced motion. The hero demo stops by itself after three runs (about 32s) and shows Replay; under reduced motion it shows only the finished frame.
- **Headings:** one `h1` per page and no skipped levels (compare cards are `h3`, résumé sections are `h2`).
- **Typography details:** curly quotes and apostrophes in copy; `text-wrap: balance` on headings and `pretty` on paragraphs; tabular numbers in stats and outcomes.
- **Layout shift:** every `img` carries its intrinsic `width` and `height`.
- **Decoration hidden:** decorative icons are `aria-hidden`. The hero demo is one `role="img"` with a sentence describing what happens.
- **Dark mode:** follows the system setting; force it with `data-theme="light"` or `"dark"` on `<html>`.
- **Media:** every image has alt text, and every video has an `aria-label` and a poster.

---

## 13. Open issues

These are inconsistencies in the current CSS, not intended design.

| # | Issue | Fix |
|---|---|---|
| 1 | h3 line-height inherits 1.55 from body, which is loose at 22–28px | `h3 { line-height: 1.25; }` |
| 2 | 12 fixed text sizes; 15/14/13 are hard to tell apart | Merge `meta` and `tag` into `caption` (14) |
| 3 | Instrument Sans 700 is loaded but unused | Load `wght@400;500;600` only |
| 4 | Five tracking values (−0.01 to −0.03em) | Reduce to −0.01 / −0.02 / −0.03 |
| 5 | `#7DB6FF` (blue-on-night) and the 22px loop-icon radius are hard-coded | Add `--blue-night` and use `--r-md` |
| 6 | Loop icon colors are hard-coded per class | Move them to `--chip-1`…`--chip-8` tokens |
| 7 | Mobile band radius is a literal `32px` | Use `var(--r-lg)` |
| 8 | Spacing has no tokens; 12 near-duplicate values are written inline | Add `--space-1`…`--space-12` from section 4.1 |
| 9 | ~~Blue eyebrow on white is 3.3:1, below AA for 16px text~~ | Done: `--blue-text` `#1B66C9` for blue text and white-on-blue tags; `#3B8EF0` stays for fills and focus |
