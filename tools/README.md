# stipple.py

Redraws a photograph as a pointillist painting. This is what produced
`public/img/hero.jpg` from `haleakala-source.jpeg`.

```sh
python3 -m venv v && ./v/bin/pip install Pillow numpy

./v/bin/python stipple.py haleakala-source.jpeg ../public/img/hero.jpg \
  --preset painterly --width 2560 --sample-width 1800

./v/bin/python stipple.py haleakala-source.jpeg ../public/img/hero-sm.jpg \
  --preset painterly --width 1280 --sample-width 1000
```

Presets are `painterly` (the one in use), `fine`, `coarse` and `subtle`.
`--seed` changes the dot scatter without changing anything else, so re-running
with a new seed gives a different painting of the same photograph.

To swap in a different photo, point it at the new file. Useful knobs:

| flag | does |
| --- | --- |
| `--shadow-lift` | raises deep shadows so dark areas keep dot texture; 0 to 0.8 |
| `--saturation` | pushes colour before sampling |
| `--crop` | `left,top,right,bottom` as 0–1 fractions |

The single most important internal knob is `radius_ratio` in the preset: dot
radius as a fraction of the lattice pitch. Below about 0.55 the dots stop
touching and the image falls apart into a halftone screen.
