"""
Render a binary STL as a shaded still.

Deliberately small: parse triangles, rotate, project, sort back-to-front and
fill. No renderer dependency, and the output is tuned to the site's palette
rather than to a CAD program's default grey-on-black.

Painter's algorithm rather than a z-buffer. For a single closed convex-ish
solid, sorting faces by depth and drawing back to front is correct enough, and
it keeps the whole thing to one PIL call per triangle.
"""

import argparse
import struct

import numpy as np
from PIL import Image, ImageDraw


def load_stl(path):
    """Return an (n, 3, 3) array of triangle vertices from a binary STL."""
    with open(path, "rb") as f:
        data = f.read()

    if data[:5] == b"solid" and b"facet" in data[:512]:
        raise SystemExit("ASCII STL not supported; this expects binary")

    count = struct.unpack("<I", data[80:84])[0]
    # Each record: 12 floats (normal + 3 vertices) then a 2-byte attribute.
    rec = np.frombuffer(data, dtype=np.uint8, count=count * 50, offset=84)
    rec = rec.reshape(count, 50)
    floats = np.frombuffer(rec[:, :48].tobytes(), dtype="<f4").reshape(count, 4, 3)
    return floats[:, 1:, :].astype(np.float64)


def rotate(tris, spin, tilt):
    """
    Spin the model on its own axis, then tip it toward the viewer.

    STL solids of revolution come out of CAD Z-up, so the spin is about Z and
    the tilt about X. Doing it the other way round tips the model before it is
    standing, which lays it on its side.
    """
    a, b = np.radians(spin), np.radians(tilt)
    rz = np.array([[np.cos(a), -np.sin(a), 0], [np.sin(a), np.cos(a), 0], [0, 0, 1]])
    rx = np.array([[1, 0, 0], [0, np.cos(b), -np.sin(b)], [0, np.sin(b), np.cos(b)]])
    return tris @ rz.T @ rx.T


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float64)


def render(
    tris,
    width,
    height,
    base="#9d8a99",
    bg="#f4f3ef",
    spin=20.0,
    tilt=-74.0,
    light=(-0.35, -0.55, 0.75),
    ambient=0.32,
    margin=0.1,
    supersample=3,
):
    """
    Flat-shaded render on a flat ground colour.

    `base` tints the solid, so the render can be keyed to the facet colour it
    sits next to instead of arriving as generic CAD grey.
    """
    tris = rotate(tris, spin, tilt)

    # Face normals, for Lambertian shading.
    e1 = tris[:, 1] - tris[:, 0]
    e2 = tris[:, 2] - tris[:, 0]
    normals = np.cross(e1, e2)
    lengths = np.linalg.norm(normals, axis=1, keepdims=True)
    lengths[lengths == 0] = 1.0
    normals /= lengths

    lv = np.array(light, dtype=np.float64)
    lv /= np.linalg.norm(lv)
    shade = ambient + (1 - ambient) * np.clip(normals @ lv, 0, 1)

    # Fit to frame on the x/y extents, preserving aspect.
    w, h = width * supersample, height * supersample
    pts = tris.reshape(-1, 3)
    lo, hi = pts[:, :2].min(axis=0), pts[:, :2].max(axis=0)
    span = ((hi - lo) / np.array([w, h])).max()
    scale = (1 - 2 * margin) / span
    centre = (lo + hi) / 2

    xy = (tris[:, :, :2] - centre) * scale
    xy[:, :, 1] *= -1  # screen y grows downward
    xy += np.array([w / 2, h / 2])

    img = Image.new("RGB", (w, h), tuple(hex_rgb(bg).astype(int)))
    draw = ImageDraw.Draw(img)

    col = hex_rgb(base)

    # Backface culling. Painter's algorithm alone breaks on a part with internal
    # structure — this sole has a honeycomb lattice inside it, and rear-facing
    # interior walls were sorting in front of the top surface and painting dark
    # spikes across it. Dropping faces that point away from the camera removes
    # them before depth sorting ever sees them.
    facing = normals[:, 2] > 0
    keep = np.flatnonzero(facing)
    order = keep[np.argsort(tris[keep, :, 2].mean(axis=1))]  # back to front

    for i in order:
        s = shade[i]
        # Lift toward white rather than scaling toward black, which keeps the
        # tint readable instead of muddying it in the shadows.
        rgb = col * s + 255 * (1 - s) * 0.22
        draw.polygon(
            [tuple(p) for p in xy[i]],
            fill=tuple(np.clip(rgb, 0, 255).astype(int)),
        )

    return img.resize((width, height), Image.LANCZOS)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("src")
    p.add_argument("dst")
    p.add_argument("--width", type=int, default=1200)
    p.add_argument("--height", type=int, default=900)
    p.add_argument("--spin", type=float, default=20.0)
    p.add_argument("--tilt", type=float, default=-74.0)
    p.add_argument("--base", default="#9d8a99")
    p.add_argument("--bg", default="#f4f3ef")
    args = p.parse_args()

    tris = load_stl(args.src)
    img = render(tris, args.width, args.height, base=args.base, bg=args.bg,
                 spin=args.spin, tilt=args.tilt)
    img.save(args.dst, quality=92)
    print(f"{args.dst}  {img.size[0]}x{img.size[1]}  {len(tris):,} triangles")


if __name__ == "__main__":
    main()
