"""
Pointillist stipple renderer.

Redraws a photograph as tens of thousands of hard-edged coloured dots, the way a
pointillist painting builds tone out of discrete touches of pigment rather than
continuous gradient.

Five things have to work together or it reads as a halftone filter instead of paint:

  1. underpainting     - a soft, posterised wash sits beneath the dots so the gaps
                         between them show colour, not a flat dead ground
  2. overlapping dots  - dot radius is derived from the lattice pitch so coverage
                         exceeds 1.0; dots must touch and pile up to build tone
  3. jittered sampling - the lattice is randomly nudged, so the eye reads texture
                         rather than a printed grid
  4. hue scatter       - each dot is pushed off the sampled colour along hue and
                         saturation, so neighbouring dots mix optically
  5. shadow lift       - deep shadows are raised before sampling, otherwise dark
                         regions collapse into a single black and lose all texture
"""

import argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance


# ---------------------------------------------------------------- source prep

def load_source(path, long_edge, shadow_lift, saturation, crop=None):
    """Load the photo, optionally crop, lift its shadows and push its colour."""
    img = Image.open(path).convert("RGB")

    if crop:
        w, h = img.size
        l, t, r, b = crop
        img = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))

    w, h = img.size
    scale = long_edge / max(w, h)
    if scale != 1.0:
        img = img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    if shadow_lift > 0:
        # Gamma curve. Raises shadows hard while leaving highlights alone, so the
        # silhouetted foreground keeps visible colour instead of crushing to black.
        a = np.asarray(img, dtype=np.float32) / 255.0
        a = a ** (1.0 - shadow_lift)
        img = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))

    if saturation != 1.0:
        img = ImageEnhance.Color(img).enhance(saturation)

    return img


def detail_map(img, blur=2.0):
    """Local contrast normalised to 0..1. High on edges, near zero on gradients."""
    grey = np.asarray(img.convert("L"), dtype=np.float32)
    smooth = np.asarray(
        img.convert("L").filter(ImageFilter.GaussianBlur(blur)), dtype=np.float32
    )
    d = np.abs(grey - smooth)
    hi = np.percentile(d, 98) or 1.0
    return np.clip(d / hi, 0.0, 1.0)


def posterize(rgb, levels):
    """Collapse the palette so dots share pigments instead of all being unique."""
    if levels <= 0:
        return rgb
    step = 255.0 / levels
    return np.clip(np.round(rgb / step) * step, 0, 255)


def underpainting(src, out_size, blur, darken, levels):
    """
    The wash beneath the dots.

    A heavily blurred, posterised, slightly darkened copy of the photo. Its only
    job is to make sure that wherever a dot does not land, the eye still finds a
    colour that belongs to the picture.
    """
    base = src.filter(ImageFilter.GaussianBlur(blur))
    a = posterize(np.asarray(base, dtype=np.float32), levels) * darken
    base = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    return base.resize(out_size, Image.LANCZOS)


def scatter_colour(rgb, rng, hue_amt, sat_amt, val_amt):
    """
    Push each dot's colour off the sampled value.

    Channels are perturbed unequally, which shifts hue as well as brightness.
    That divergence is what makes neighbouring dots blend optically.
    """
    n = rgb.shape[0]
    hue = rng.normal(0.0, hue_amt, size=(n, 3))
    sat = rng.normal(1.0, sat_amt, size=(n, 1))
    val = rng.normal(0.0, val_amt, size=(n, 1))

    mean = rgb.mean(axis=1, keepdims=True)
    out = mean + (rgb - mean) * sat          # saturate about the dot's own grey
    out = out + hue * 255.0 + val * 255.0
    return np.clip(out, 0, 255)


# -------------------------------------------------------------------- render

def stipple(
    src,
    out_w,
    spacing=6.0,
    jitter=0.6,
    radius_ratio=0.78,
    radius_var=0.30,
    detail_shrink=0.35,
    density_boost=1.4,
    hue_amt=0.030,
    sat_amt=0.22,
    val_amt=0.022,
    levels=16,
    wash_blur=9.0,
    wash_darken=0.80,
    seed=7,
):
    """
    spacing        - lattice pitch in source pixels; smaller means more dots
    jitter         - how far a dot may wander off its cell, as a fraction of pitch
    radius_ratio   - dot radius as a fraction of output pitch. Above ~0.55 dots
                     overlap, which is what builds continuous tone. This is the
                     single most important knob.
    detail_shrink  - how much busy regions shrink their dots, 0..1. Kept low so
                     detailed areas stay covered.
    density_boost  - extra dots scattered into high-detail regions
    levels         - palette quantisation steps; lower is more posterised
    """
    rng = np.random.default_rng(seed)
    sw, sh = src.size
    scale = out_w / sw
    out_h = round(sh * scale)

    pixels = posterize(np.asarray(src, dtype=np.float32), levels)
    detail = detail_map(src)

    # --- base lattice -----------------------------------------------------
    cols, rows = int(sw / spacing), int(sh / spacing)
    gx, gy = np.meshgrid(np.linspace(0, sw - 1, cols), np.linspace(0, sh - 1, rows))
    xs = gx.ravel() + rng.uniform(-jitter, jitter, gx.size) * spacing
    ys = gy.ravel() + rng.uniform(-jitter, jitter, gy.size) * spacing

    # --- extra dots where the image is busy -------------------------------
    # Candidates kept in proportion to local detail, so cloud edges and the
    # ridgeline build density that the open sky never gets.
    extra_n = int(xs.size * density_boost)
    cx = rng.uniform(0, sw - 1, extra_n)
    cy = rng.uniform(0, sh - 1, extra_n)
    keep = rng.random(extra_n) < detail[cy.astype(int), cx.astype(int)]
    xs = np.concatenate([xs, cx[keep]])
    ys = np.concatenate([ys, cy[keep]])

    xi = np.clip(xs.astype(int), 0, sw - 1)
    yi = np.clip(ys.astype(int), 0, sh - 1)
    rgb = scatter_colour(pixels[yi, xi], rng, hue_amt, sat_amt, val_amt)

    # --- radius, in OUTPUT pixels, anchored to the lattice pitch -----------
    # Deriving radius from pitch is what guarantees the dots actually touch.
    pitch_out = spacing * scale
    d = detail[yi, xi]
    radius = pitch_out * radius_ratio * (1.0 - detail_shrink * d ** 0.7)
    radius *= rng.uniform(1.0 - radius_var, 1.0 + radius_var, radius.size)
    radius = np.maximum(radius, 0.8)

    # --- draw -------------------------------------------------------------
    # Supersample and reduce once, which gives clean circle edges cheaply.
    ss = 2
    canvas = underpainting(
        src, (out_w * ss, out_h * ss), wash_blur * ss, wash_darken, levels
    )
    draw = ImageDraw.Draw(canvas)

    # Big dots first, so fine detail dots land on top of them.
    order = np.argsort(-radius)
    px, py, pr = xs * scale * ss, ys * scale * ss, radius * ss

    for i in order:
        x, y, r = px[i], py[i], pr[i]
        draw.ellipse(
            (x - r, y - r, x + r, y + r),
            fill=(int(rgb[i, 0]), int(rgb[i, 1]), int(rgb[i, 2])),
        )

    return canvas.resize((out_w, out_h), Image.LANCZOS), xs.size


PRESETS = {
    # Sharpest of the set. Small dots, a wide palette and little hue scatter, so
    # detail survives: faces, edges and thin shapes stay readable while the
    # surface still reads as paint rather than photograph.
    "crisp": dict(spacing=4.3, radius_ratio=0.78, density_boost=1.8,
                  hue_amt=0.021, sat_amt=0.15, levels=22, detail_shrink=0.26,
                  radius_var=0.27),
    # The chosen look. Dots stay individually legible so the surface reads as
    # paint, while the ridgeline and the two figures still hold their edges.
    "painterly": dict(spacing=6.2, radius_ratio=0.84, density_boost=1.3,
                      hue_amt=0.036, sat_amt=0.26, levels=14, radius_var=0.34),
    # Closest to the Amy La reference: fine dots, strong optical mixing.
    "fine": dict(spacing=4.5, radius_ratio=0.80, density_boost=1.6,
                 hue_amt=0.032, sat_amt=0.24, levels=18),
    # Chunkier and more obviously hand-touched. Reads as paint from further away.
    "coarse": dict(spacing=8.0, radius_ratio=0.85, density_boost=1.1,
                   hue_amt=0.040, sat_amt=0.28, levels=12, radius_var=0.36),
    # Restrained: closer to the photograph, dots visible but not shouting.
    "subtle": dict(spacing=5.0, radius_ratio=0.72, density_boost=1.3,
                   hue_amt=0.018, sat_amt=0.14, levels=24, detail_shrink=0.25),
}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("src")
    p.add_argument("dst")
    p.add_argument("--preset", choices=sorted(PRESETS), default="painterly")
    p.add_argument("--width", type=int, default=2400)
    p.add_argument("--sample-width", type=int, default=1400,
                   help="resolution the photo is sampled at")
    p.add_argument("--shadow-lift", type=float, default=0.45,
                   help="0..0.8; raises deep shadows so they keep texture")
    p.add_argument("--saturation", type=float, default=1.25)
    p.add_argument("--crop", default=None,
                   help="left,top,right,bottom as 0..1 fractions")
    p.add_argument("--seed", type=int, default=7)
    args = p.parse_args()

    crop = tuple(float(v) for v in args.crop.split(",")) if args.crop else None
    src = load_source(args.src, args.sample_width, args.shadow_lift,
                      args.saturation, crop)

    img, n = stipple(src, args.width, seed=args.seed, **PRESETS[args.preset])
    img.save(args.dst, quality=92)
    print(f"{args.dst}  {img.size[0]}x{img.size[1]}  {n:,} dots  preset={args.preset}")


if __name__ == "__main__":
    main()
