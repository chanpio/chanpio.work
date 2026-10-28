# chanpio.work

Static portfolio site. Plain HTML and CSS, no build step. Edit any `index.html` directly.

## Structure

```
index.html            Home
nudge/                Now Nudge
automation/           Gemini Automation (new)
cts/                  Circle to Search
spay/                 Samsung Pay Web
color-picker/         Color picker for everyone
splitscreen/          Split screen for Galaxy Z Fold
assets/style.css      All styles (colors at the top under :root)
images/               Put images here (see list below)
CNAME                 Custom domain for GitHub Pages
```

## Deploy to GitHub Pages

1. Create a public repo on GitHub, for example `chanpio.work`.
2. Upload every file in this folder to the repo root, including `CNAME` and `.nojekyll`.
3. Repo **Settings → Pages**: Source = "Deploy from a branch", Branch = `main`, folder `/ (root)`.
4. At your domain registrar, change DNS:
   - `www` → CNAME → `<your-github-username>.github.io`
   - Apex `chanpio.work` → A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. Back in Settings → Pages, wait for the DNS check, then turn on **Enforce HTTPS**.
6. Cancel the Figma Sites subscription only after the new site loads at www.chanpio.work.

## Images

All 47 images came from the live Figma site and were converted for the web (56 MB down to about 6 MB):
PNG became WebP, and animated GIFs became looping MP4 videos with a WebP poster frame.

Files live at `images/<project>/<number>.webp` or `.mp4`. Swap any one by replacing the file with the same name.
`01` in each folder is the cover image on the home page and case study header.

Still missing:
- `images/automation/` is empty, so the Gemini Automation page has no images and its home card shows the title on a pink tile. Add `01.webp` for a cover.

## Content to verify before going live

These lines were rewritten or drafted. Check each one is accurate and cleared to publish.

- **Gemini Automation (whole page)**: drafted from your notes. No metrics yet. Confirm the team line and add numbers if you have them.
- **Now Nudge, "Designing for the wrong guess"**: drafted. Confirm each bullet (precision tuning, dismissal learning, on-device processing) matches what shipped.
- **Now Nudge 60% / 40%**: state where these came from (usability test, A/B, telemetry).
- **Circle to Search 80%**: reworded from "10 mins to 2 mins" to "less time to complete a visual search task in testing". Confirm the basis.
- **Samsung Pay 14%**: now "lift in share of the promoted credit card". Confirm meaning.
- **Samsung Pay years**: set to 2014–2019 from your resume. The web checkout itself may be narrower.
- **Years of experience**: site says 15+. Resume says 18+. Make them match.
- **Phone number**: removed from the site on purpose. Email and LinkedIn only.
