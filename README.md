# subhiksha stephan — personal site

Vite + React + Tailwind v4. One page, no router, no CMS.

```sh
npm install
npm run dev
npm run build     # -> dist/
```

## Editing content

Everything you would want to change is in **`src/data/content.js`** — the hero
lines, every project, research, community, honors, and the nine about facets.
Layout components read from it and never hardcode copy, so you can rewrite the
whole site without opening a component.

### The about panel

`facets` is the ten tiles in the about section. Each needs an `icon` (a name
exported by [lucide-react](https://lucide.dev)), a short `label` for the tile, a
`title`, and `text`. Add `photos` and they appear under the text.

They split into two columns either side of the seated figure in the painting.
Nothing is selected at rest, so she stays visible; picking a facet scales its
panel in over the middle, and closing it gives her back.

The array is split at `HALF` in `src/sections/About.jsx`, so an even count keeps
the columns level. Arrow keys assume that split: up and down step within a
column, left and right jump across by `HALF`.

Import any new icon **by name** in that file and add it to the `ICONS` map. A
wildcard import pulls all ~1,500 Lucide icons into the bundle and costs a
megabyte.

Projects render whatever fields they have. `stats`, `note`, `image` and `links`
are all optional; omit them and the layout closes up.

### The work carousel

`work` shows one project at a time, with every project title listed across the
top so nothing hides behind an anonymous dot. Adding or removing entries needs
no layout change — the counter and the arrows read the array length.

It deliberately does not auto-advance.

## Colour

Tokens live in the `@theme` block at the top of `src/index.css`. The paper is a
cool neutral off-white, not a cream, and the accent is blue.

There are two accents on purpose. No single blue clears 4.5:1 against both the
paper and the near-black footer, so `accent` (#1e5f9e) is for ink-on-paper and
`accent-soft` (#5b9fe3) for the dark sections — the footer, and the nav while it
is still over the hero. If you change either, check both numbers before shipping.

## Images

- `public/img/hero.jpg` — the Haleakalā painting, plus `hero-sm.jpg` for small screens.
- `public/img/about-bg.jpg` — the sunset-field painting behind the "who i am"
  block only, at full strength with nothing washed over it. The tiles, the prompt
  chip and the detail panel all carry their own paper fills instead, which is what
  keeps the type readable where the painting runs dark. The block is top-weighted
  with deep bottom padding on purpose: the seated figure sits low and centre in the
  photograph, so that open band is the only place she is not covered by the tiles
  or the panel. If you swap this photo, re-check that whatever matters in it lands
  in that band.
  Regenerate either painting with `tools/stipple.py`; both source photos live beside it.
  The hero uses the `painterly` preset and the about background uses `crisp`. That
  is deliberate: the hero is enormous and reads better abstract, while the about
  image has a figure in it that has to stay recognisable.
- `public/img/portrait.jpg` — the headshot in the about rail.
- `public/img/work/` — project images. `apidrift` is the one still missing.
- `public/img/hobbies/` — photographs.

Add a project image by setting `image` on that project in `content.js`, plus
`imageAlt` and an optional `imageCaption`. A project with no `image` just skips
the figure.

## Deploying

Vercel picks this up with no configuration: framework Vite, build `npm run build`,
output `dist`.

## The previous site

Untouched, in `../avidnerd.vercel.app-1/`.
