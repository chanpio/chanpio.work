# Home hero: Now Nudge demo

Source for the animated phone in the home page hero. The site itself has no build step:
the built files in `../assets/hero/` are committed, and `index.html` loads them.

- `nudge-hero/`: the demo (story, One UI chrome, styles, the Calendar icon cropped from the case study's `w-place-keyboard` screen)
- `main.tsx`: mounts it into `#nudge-hero` and lights the hero's Knowing / Anticipating / Acting list from the stage's `data-mark`
- `kit/`: a copy of the [stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow) kit, MIT (see `kit/LICENSE`)

## Rebuild after a change

```
cd hero
npm install
npm run build      # writes ../assets/hero/nudge-hero.js and .css
```

Commit the rebuilt files in `assets/hero/` with the source change.
